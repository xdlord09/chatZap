//client side code will be kept here
const socket = io()

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }

    //Append
    appendMessage(msg , 'outgoing');
    textarea.value = '';
    scrollToBottom();

    //send message to server 
    socket.emit('message',msg); //msg-- is the object of sendMessage function
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    //create div with classes - className and message
    mainDiv.classList.add(className, 'message')
    
    //message box
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);

}

//Recieve message 

socket.on('message', (msg) =>{
   appendMessage(msg, 'incoming');
   scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}

