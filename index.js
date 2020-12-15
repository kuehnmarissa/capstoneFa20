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
app.get('/github', pages.getGithubPage);
app.get('/htmllesson1', pages.getHTMLLesson1);
app.get('/htmllesson2', pages.getHTMLLesson2);
app.get('/htmllesson3', pages.getHTMLLesson3);
app.get('/htmllesson4', pages.getHTMLLesson4);
app.get('/htmllesson5', pages.getHTMLLesson5);
app.get('/htmllesson1test', pages.getHTMLLesson1Test);
app.get('/htmllesson2test', pages.getHTMLLesson2Test);
app.get('/htmllesson3test', pages.getHTMLLesson3Test);
app.get('/jslesson1', pages.getJSLesson1);
app.get('/jslesson2', pages.getJSLesson2);
app.get('/jslesson3', pages.getJSLesson3);
app.get('/jslesson4', pages.getJSLesson4);
app.get('/jslesson5', pages.getJSLesson5);
app.get('/jslesson1test', pages.getJSLesson1Test);
app.get('/jslesson2test', pages.getJSLesson2Test);
app.get('/jslesson3test', pages.getJSLesson3Test);
app.get('/lesson1', pages.getLesson1);
app.get('/lesson2', pages.getLesson2);
app.get('/lessons', pages.getLessons);
app.get('/login', pages.getLogin);
app.get('/newuser', pages.getNewUser);
app.get('/timer', pages.getTimer);

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
