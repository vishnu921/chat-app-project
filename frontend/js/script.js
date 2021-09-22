const socket = io('http://localhost:8000');

const form = document.getElementById('sendForm');
const messageInput = document.getElementById('messageInput');
const messageBox = document.querySelector(".container");

const enterBtn = document.getElementById('enterBtn');
const username = document.getElementById('username');

const newUserJoined = (name) => {
    socket.emit('new-user-joined', name);
}

enterBtn.addEventListener('click', () => {
    console.log('click', username.value);
    const name = username.value;
    if(name === ""){
        return;
    }
    newUserJoined(name);
});