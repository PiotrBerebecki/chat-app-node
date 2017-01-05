const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));


// Event listeners for connecting and disconnecting server to client
io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('newMessage', {
    from: 'Dan',
    text: 'Let\'s meet up on 6',
    createdAt: 123
  });
  
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
