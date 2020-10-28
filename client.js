
let socket = io('http://localhost:3000');
console.log('here');
const log = console.log;

function getEl(id) {
  return document.getElementbyId(id);
}

const ide = getEl('ide');
log('here1')
ide.addEventListener('keyup' , (evt) => {
  const code = ide.value;
  socket.send(code);
});

socket.on('message' (data) => {
  ide.value = data;
  log(ide.value);
});
