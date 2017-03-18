var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        sender: 'Fateh@uettaxila.com',
        text: 'I am done! Really!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected form server');
});

socket.on('sendMessage', function(data) {
    console.log('Client: ', data.from);
    console.log('Message: ', data.text);
    console.log('Received On: ', data.createdAt);
});

socket.on('welcome', function(data) {
    console.log('Admin: ', data.message);
})


