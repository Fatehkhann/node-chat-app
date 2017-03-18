const path = require('path');
const express = require('express');
const http = require("http");
const hbs = require('hbs');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname + './../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
})

io.on('connection', (socket) => {
    console.log('New User Connected');
    
    socket.on('createMessage', (data) => {
        io.emit('sendMessage', {
            from: data.sender,
            text: data.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('A user is disconnected');
    });
});



server.listen(port, () => {
    console.log('Server is running on port ', port);
});