// Connect client to server
var socket = io();


socket.on('connect', function() {
  console.log('Client has connected to server');
});


// render new message
socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('HH:mm');
  
  const li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime} ${message.text}`);
  
  jQuery('#messages').append(li);
});


// render location message
socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('HH:mm');
  
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  
  li.text(`${message.from} ${formattedTime} `);
  a.attr('href', message.url);
  
  li.append(a);
  jQuery('#messages').append(li);
});


// create message on form submit
const messageTexbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  socket.emit('createMessage', {
    from: 'User',
    text: messageTexbox.val()
  }, function() {
    messageTexbox.val('');
  });
});


// location
const locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not support but your browser');
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');
    
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});


// handle disconnect
socket.on('disconnect', function() {
  console.log('Client has disconnected from server');
});
