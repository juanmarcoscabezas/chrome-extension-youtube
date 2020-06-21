chrome.runtime.sendMessage({todo: "color"});
chrome.runtime.sendMessage({todo: "activate_icon"});

// Connect to socket
const socket = io('https://3.12.74.191:3000', {secure: true});

// Creating chat container
const chatContainer = document.createElement('div');
chatContainer.id = 'chat-container';
chatContainer.classList.add('style-scope');
chatContainer.classList.add('ytd-watch-flexy');

// Creating chat input
const chatInput = document.createElement('textarea');
chatInput.id = 'chat-input';

// Creating chat button
const chatButton = document.createElement('button');
chatButton.id = 'chat-button';
chatButton.innerText = 'Send message';

chatContainer.appendChild(chatInput);
chatContainer.appendChild(chatButton);
document.querySelector('#columns').appendChild(chatContainer);

// User data

const userData = {
  text: '',
  img: '',
  date: ''
}

// EVENTS
chatButton.onclick = function(element) {
  sendMessage();
}

chatInput.onkeydown = function(event) {
  if (event.keyCode === 13 && chatInput.value.trim() !== '') {
    sendMessage();
  }
}

// SOCKET EVENTS
socket.on('message', (data) => {
  createMessage(data, false);
});

/**
 * createMessage - Creates a new message in the chat container
 * @param {} data
 * @param {} mine
 */
function createMessage(data, mine = false) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('chat-new-message');

  if (mine) {
    newMessage.classList.add('chat-new-message__mine');
  } else {
    const newMessageImg = document.createElement('img');
    newMessageImg.src = data.img;
    newMessage.appendChild(newMessageImg);
  }
  
  const newMessageP = document.createElement('p');
  newMessageP.innerText = data.text;

  newMessage.appendChild(newMessageP);
  chatContainer.appendChild(newMessage);
}

/**
 * sendMessage - Sends the message to the server
 */
function sendMessage() {
  const data = userData;
  data.text = chatInput.value.trim();
  data.img = document.querySelector('#img').src;
  data.date = new Date();

  socket.emit('message', data);
  createMessage(data, true);
  chatInput.value = '';
}