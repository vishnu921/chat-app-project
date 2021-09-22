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
    console.log('connected with socket id =', socket.id);
    // socket.on('new-user-joined', name => {
    //     users[socket.id] = name;
    //     socket.broadcast.emit('user-joined', name);
    // });

    // socket.on('send', message => {
    //     socket.broadcast.emit('recieve', { message: message, name: user[socket.id]});
    // });
});

server.listen(port, () => {
    console.log(`server started at port ${port}`);
});