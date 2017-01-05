// Connect client to server
var socket = io();

socket.on('connect', function() {
  console.log('Client has connected to server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
});

socket.on('disconnect', function() {
  console.log('Client has disconnected from server');
});
