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

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(data) {
//   console.log('Got it', data);
// });


console.clear();


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
    // console.log(2);
  });
});
