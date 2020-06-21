chrome.runtime.sendMessage({todo: "color"});
chrome.runtime.sendMessage({todo: "activate_icon"});

// Connect to socket
const socket = io('http://localhost:3000');

// Creating chat container
const chatContainer = document.createElement('div');
chatContainer.id = 'chat-container';
chatContainer.classList.add('style-scope');
chatContainer.classList.add('ytd-watch-flexy');

// Creating chat input
const chatInput = document.createElement('input');
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
  img: ''
}

// EVENTS
chatButton.onclick = function(element) {
  const data = userData;
  data.text = chatInput.value;
  data.img = document.querySelector('#img').src;

  socket.emit('message', data);
  createMessage(data, true);
  chatInput.value = '';
}

chatInput.onkeydown = function(event) {
  if (event.keyCode === 13 && chatInput.value.trim() !== '') {
    const data = userData;
    data.text = chatInput.value;
    data.img = document.querySelector('#img').src;

    createMessage(data, true);
    chatInput.value = '';
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
  }
  
  const newMessageP = document.createElement('p');
  newMessageP.innerText = data.text;

  const newMessageImg = document.createElement('img');
  newMessageImg.src = data.img;

  newMessage.appendChild(newMessageImg);
  newMessage.appendChild(newMessageP);
  chatContainer.appendChild(newMessage);
}