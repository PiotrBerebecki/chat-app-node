const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');


const app = express();
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });
  
  socket.on('createLocationMessage', (coords) => {
    console.log('in server', coords.latitude);
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
