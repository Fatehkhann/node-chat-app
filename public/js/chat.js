var socket = io();

function scrollToBottom () {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Error');
        }
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user))
    });

    jQuery('#users').html(ol);
})

socket.on('newMessage', function (data) {
    var formattedTime = moment(data.generatedAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, { 
        text: data.text, 
        from: data.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var msgTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
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

// socket.on('welcome', function (data) {
//     console.log('Admin: ', data.message);
// });

// socket.emit('createMessage', {
//     name: 'Sidra Amin',
//     text: 'She is awesome'
// }, function (data) {
//     console.log('Got it! ', data);
// });




