const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

app.get('/', (req, res) => {
	console.log('Entra');
	return res.send('Holaa');
});

const options = {
	key: fs.readFileSync(__dirname + '/security/cert.key'),
	cert: fs.readFileSync(__dirname + '/security/cert.pem')
};

console.log(options)

const server = https.createServer(options, app)
  .listen(3000, () => {
    console.log('Running on port 3000');
  });


// const server = require('http').createServer(app);


// const io = require('socket.io')(server);

// io.on('connection', client => {

//   console.log('User connected');

//   client.on('message', data => {
//     console.log(data);
//     client.broadcast.emit('message', data);
//   });

//   client.on('disconnect', () => {console.log('Disconected')});
// });

// app.get('/', (req, res) => {
// 	console.log('Entra');
// 	return res.send('Holaa');
// })