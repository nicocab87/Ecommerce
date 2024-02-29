const socket = io();
let user;

// Elements
const userEmail = document.getElementById("user");
const chatBox = document.getElementById("chatBox");
const messageLog = document.getElementById("messageLog")

// Event Listenners

chatBox.addEventListener ('keyup', (e) => {
    if(e.key == 'Enter'){
        socket.emit('userMessage', {user, message:e.target.value, time: new Date().toLocaleTimeString()})
        e.target.value = ''
    }
})

// Socket EVents
socket.on('messages', (message)=>{
    if(!user){return}
    console.log(message)
    messageLog.innerHTML = ''
    message.forEach(m => {
        messageLog.innerHTML+= `<br/> ${m.time} ${m.user}: ${m.message}`
    });
})

socket.on('newUser', ({newUser}) => {
    if(!user){return}
    Swal.fire({
        text: `${newUser} se ha unido al chat`,
        toast: true,
        position: 'top-right'
    })
})

// Alerts
Swal.fire({
    title:'Bienvenido al chat del Ecommerce',
    text:'Ingresa tu Email!',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        if(!value){
            return "pone un email"
        }
    }
}).then((result)=> {
    user = result.value
    userEmail.innerHTML = `Usted accedió como: ${user}`
    socket.emit('authenticated', {user})
})