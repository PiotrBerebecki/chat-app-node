const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');


// initial setup
const app = express();
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();


io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    
    
    // methods for emitting in socket.IO
    // io.emit - emit to everyone
    // socket.broadcast.emit - emit to everyone connect except for current user
    // socket.emit - emit to one user
    
    // to target rooms you can chain the to() method
    // io.to('React').emit
    // socket.broadcast.to('React').emit
    // no point to do: socket.to('React').emit as we are only targeting one user
    
    // leaving a room:
    // socket.leave('React')
    
    socket.join(params.room);
    users.removeUser(socket.id); // remove user from all rooms
    users.addUser(socket.id, params.name, params.room);
    
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', 
                                          generateMessage('Admin', `${params.name} has joined`)
                                          );
    callback();
  });
  
  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    
    callback();
  });
  
  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    
    if (user) {
      io.to(user.room).emit('newLocationMessage', 
                            generateLocationMessage(user.name, coords.latitude, coords.longitude)
                           );
    }
  });
  
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', 
                            generateMessage('Admin', `${user.name} has left.`)
                            );
    }
  });
  
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
