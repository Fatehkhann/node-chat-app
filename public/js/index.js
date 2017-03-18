var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     sender: 'Fateh@uettaxila.com',
    //     text: 'I am done! Really!'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('sendMessage', function (data) {
    console.log('Client: ', data.from);
    console.log('Message: ', data.text);
    console.log('Received On: ', data.generatedAt);
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text} on ${data.generatedAt}`);
    jQuery('#messages').append(li);
});

socket.on('welcome', function (data) {
    console.log('Admin: ', data.message);
});

socket.emit('createMessage', {
    name: 'Sidra Amin',
    text: 'She is awesome'
}, function (data) {
    console.log('Got it! ', data);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        name: 'Sidra Amin',
        text: jQuery('[name=message]').val()
    }, function (data) {
        //console.log('Got it! ', data);
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(error){
        return alert('Unable to fetch location')
    })
})


