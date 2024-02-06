const socket = io ();

const createProductButton = document.getElementById("createProductButton");



socket.emit('message', 'hola como estas')