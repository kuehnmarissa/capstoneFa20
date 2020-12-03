document.addEventListener('DOMContentLoaded', function () {
    let selector = document.getElementById('language');
    let language = selector.value;
    let editor = ace.edit("editor");
    editor.session.setMode(language);
    const log = console.log;

    editor.setTheme("ace/theme/monokai");


    selector.addEventListener('change', (evt) => {
      //log(evt);
      log('changed language');
      language = selector.value;
      editor.session.setMode(language);
    });


    let socket = io('http://localhost:3000');
    let textarea = editor.textInput.getElement();

    /*editor.session.on('change', function(delta) {
      let code = editor.getValue();
      socket.send(code);
    });*/

    textarea.addEventListener('keyup', (evt) => {
      let code = editor.getValue();
      console.log(socket.id);
      socket.send(code);
      console.log(code);
    });

    socket.on('newDelta', (delta) => {
      applyingChanges = true;
      aceDocument.applyDelta(delta);
      applyingChanges = false;
    });
    socket.on('message', (data) => {
      editor.setValue(data);
    });

});
