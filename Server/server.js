const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

app.get('/', (req, res) => {
	console.log('Entra');
	return res.send('Holaa');
});

const options = {
	//key: fs.readFileSync(__dirname + '/security/cert.key'),
	//cert: fs.readFileSync(__dirname + '/security/cert.pem')
	key: fs.readFileSync(__dirname + '/certbot/privkey.pem'),
	cert: fs.readFileSync(__dirname + '/certbot/cert.pem'),
	ca: fs.readFileSync(__dirname + '/certbot/chain.pem')

};

const server = https.createServer(options, app);

const io = require('socket.io')(server);

io.on('connection', client => {

	console.log('User connected');
	client.on('message', data => {
		console.log(data);
		client.broadcast.emit('message', data);
	});
	client.on('disconnect', () => {console.log('Disconected')});
});

server.listen(3000, () => {
	console.log('Running on port 3000');
});
