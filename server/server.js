const path = require('path');
const express = require('express');
const http = require("http");
const hbs = require('hbs');
const socketIO = require('socket.io');
const {generateMsg, generateLocationMsg} = require('./utils/message');

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

    socket.emit('welcome', {
        message: 'Welcome to Bootcamp'
    });

    socket.broadcast.emit('welcome', {
        message: 'New user has joined'
    }) 


    socket.on('createMessage', (data, callback) => {
        console.log('I am sending a message to all the clients!');
        io.emit('sendMessage', generateMsg(data.name, data.text));
        callback('From Server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMsg('Admin', coords.longitude, coords.latitude))
    })

    socket.on('disconnect', () => {
        console.log('A user is disconnected');
    });
});



server.listen(port, () => {
    console.log('Server is running on port ', port);
});