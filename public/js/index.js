// Connect client to server
var socket = io();


socket.on('connect', function() {
  console.log('Client has connected to server');
});


// render new message
socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('HH:mm');

  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    text: message.text
  });
  
  jQuery('#messages').append(html);
});


// render location message
socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('HH:mm');
  
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  
  jQuery('#messages').append(html);
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
