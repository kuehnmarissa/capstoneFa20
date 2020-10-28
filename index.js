const log = console.log;
const http = require('http').createServer();
const port = 3000;

const io = require('socket.io')(http);
http.listen(port, () =>
  log(`Listening to active server on port ${port}...`)
);

io.on('connection', (socket) => {
    log('Successful  connection...');
    socket.on('message', (evt) => {
      log(evt);
      socket.broadcast.emit('message', evt)
    });
});

io.on('disconnect', (evt) => {
  log('user disconnected');
});
