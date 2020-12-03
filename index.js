//const content = require('fs').readFileSync(__dirname + '/ace.html', 'utf8');
const log = console.log;
let code = "";
let compiledCode;
const express = require('express');
const app = express();
const PORT = 3000;
const pages = require('./routes/pages');


const server = app.listen(PORT, function(){
  log(`Listening on http://localhost:${PORT}`);

});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', pages.getHomePage);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    log('Successful  connection....');
    socket.emit('message', code);

    socket.on('message', (evt) => {
      log("id:" + socket.id);
      code = evt;
      //log(code);
      socket.broadcast.emit('message', evt)

    });
});

io.on('disconnect', (evt) => {
  log('User disconnected...');
});


/*const http = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});*/




//Initalizes an active, listening server on localhost:3000
/*http.listen(port, () =>  {
  log(`Listening to active server on port ${port}...`);
});*/


//setup up the network socket commands in callback functions
//rebroadcasts the text
