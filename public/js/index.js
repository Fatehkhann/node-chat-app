var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        sender: 'Fateh@uettaxila.com',
        text: 'I am done! Really!'
    }
    );

    socket.emit('createMessage', {
        message: 'Hi Fateh!'
    })

});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('sendMessage', function(data) {
    console.log('Fateh: ', data.message);
});

socket.on('newEmail', function (data) {
    console.log("* New Email Received *");
    console.log('From: ', data.from);
    console.log('Message: ', data.text);
    console.log('Received: ', data.time);
});
