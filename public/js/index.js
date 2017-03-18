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

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        name: 'Sidra Amin',
        text: jQuery('[name=message]').val()
    }, function (data) {
        //console.log('Got it! ', data);
    });
})


