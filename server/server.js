const path = require('path');
const express = require('express');
const http = require("http");
const hbs = require('hbs');
const socketIO = require('socket.io');
const {generateMsg, generateLocationMsg} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var publicPath = path.join(__dirname + './../public');
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.get('/chat', (req, res) => {
    res.render('chat.hbs');
})

io.on('connection', (socket) => {
    console.log('New User Connected');


socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and Room Name are Required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room)); 
    
    socket.emit('newMessage', generateMsg('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMsg('Admin', `${params.name} has joined.`)) 
    callback();
});

    socket.on('createMessage', (data, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(data.text)) {
            io.to(user.room).emit('newMessage', generateMsg(user.name, data.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMsg(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMsg('Admin', `${user.name} has left`));
        }
    });
});



server.listen(port, () => {
    console.log('Server is running on port ', port);
});