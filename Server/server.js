const fs = require('fs');

const options = {
	key: fs.readFileSync('key.pem', 'utf8'),
	cert: fs.readFileSync('server.crt', 'utf8')
};

//const server = require('http').createServer();

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	console.log('Entra');
	return res.send('Holaa');
})

app.listen(4000, () => {
	console.log('Server 2');
})

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {

  console.log('User connected');

  client.on('message', data => {
    console.log(data);
    client.broadcast.emit('message', data);
  });

  client.on('disconnect', () => {console.log('Disconected')});
});

app.get('/', (req, res) => {
	console.log('Entra');
	return res.send('Holaa');
})

server.listen(3000, () => {
  console.log('Running on port 3000');
});
