const http = require('http');
const express = require('express');
const socketio = require("socket.io");
const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

app.get('/', (req,res) => {
    res.send("<h1> Home Page </h1>");
})

const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });
let users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', name => {
        console.log("new user: ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message => {
        if(users[socket.id] === undefined){
            return;
        }
        console.log(`${users[socket.id]} left`);
        socket.broadcast.emit('left', users[socket.id]);
        users[socket.id];
    })
});

server.listen(port, () => {
    console.log(`server started at port ${port}`);
});