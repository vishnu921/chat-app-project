const socket = io('http://localhost:8000');

const form = document.getElementById('sendForm');
const messageInput = document.getElementById('messageInput');
const messageBox = document.querySelector(".container");
const entryBox = document.getElementById('entryBox');
const chatBox = document.getElementById('chatBox');

const enterBtn = document.getElementById('enterBtn');
const username = document.getElementById('username');
const messAudio = new Audio('media/aud.mp3');

async function playAudio() {
    try {
        await messAudio.play();
    } catch (err) {
        console.log('Failed to play...', err);
    }
}

// function to add the message element to the chat window
const addMessage = (author, message, type) => {
    const messageEle = document.createElement('div');
    messageEle.classList.add('message', type);

    const authorEl = document.createElement('p');
    authorEl.innerText = author;
    authorEl.classList.add('author');

    const messageText = document.createElement('span');
    messageText.innerText = message;

    messageEle.appendChild(authorEl);
    messageEle.appendChild(messageText);

    messageBox.appendChild(messageEle);
    if(type !== 'right'){
        playAudio();
    }
}

// function for new user joined
const newUserJoined = () => {
    const name = username.value;
    if(name === ""){
        alert("Enter a User Name");
        return;
    }
    entryBox.classList.toggle('d-none');
    chatBox.classList.toggle('d-none');

    socket.emit('new-user-joined', name);
};

socket.on('user-joined', name => {
    addMessage('', `${name} joined the chat`, 'center');
});

socket.on('recieve', data => {
    addMessage(data.name, data.message, 'left');
});

socket.on('left', name => {
    addMessage('', `${name} left the chat`, 'center');
});

socket.on('username-exists', data => {
    chatBox.classList.toggle('d-none');
    entryBox.classList.toggle('d-none');
    
    alert(data);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const mess = messageInput.value;
    
    if(mess === ""){
        alert("Enter a message");
        return;
    }

    addMessage('', mess, 'right');
    socket.emit('send', mess);
    messageInput.value = "";
})

enterBtn.addEventListener('click', newUserJoined);
username.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        newUserJoined();
    }
});