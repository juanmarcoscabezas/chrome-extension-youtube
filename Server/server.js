const server = require('http').createServer();
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