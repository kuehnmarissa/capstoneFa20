const content = require('fs').readFileSync(__dirname + '/ace.html', 'utf8');
const log = console.log;
let code = `function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}`;
const express = require('express');
const port = 3000;

const http = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(http);


//Initalizes an active, listening server on localhost:3000
http.listen(port, () =>  {
  log(`Listening to active server on port ${port}...`);
});


//setup up the network socket commands in callback functions
//rebroadcasts the text
io.on('connection', (socket) => {
    log('Successful  connection...');
    socket.emit('message', code);
    socket.on('message', (evt) => {
      code = evt;
      socket.broadcast.emit('message', evt)
    });
});

io.on('disconnect', (evt) => {
  log('User disconnected...');
});
