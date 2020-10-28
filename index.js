const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
let code = "Hello World";

const log = console.log;
const http = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(http);
const port = 3000;


http.listen(port, () =>  {
  log(`Listening to active server on port ${port}...`);
});



io.on('connection', (socket) => {
    log('Successful  connection...');
    socket.emit('message', code);
    socket.on('message', (evt) => {
      log(evt);
      code = evt;
      socket.broadcast.emit('message', evt)
    });
});

io.on('disconnect', (evt) => {
  log('User disconnected...');
});
