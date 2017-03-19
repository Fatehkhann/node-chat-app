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
    // var formattedTime = moment(data.generatedAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${data.from} (${formattedTime}): ${data.text}`);
    // jQuery('#messages').append(li);
    var formattedTime = moment(data.generatedAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, { 
        text: data.text, 
        from: data.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.generatedAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, { 
        url: message.url, 
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var msgTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        name: 'Sidra Amin',
        text: msgTextBox.val()
    }, function (data) {
        msgTextBox.val('');
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        locationBtn.removeAttr('disabled').text('Send location');
    }, function (error) {
        return alert('Unable to fetch location');
        locationBtn.removeAttr('disabled').text('Send location');
    });
});


