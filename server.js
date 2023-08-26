const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 8000;

http.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`);
})

//middleware for importing static file
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    //only html file is send as a response -->>> server doesn't know about other urls like /public/style.css --> use middlewares
    res.sendFile(__dirname + '/index.html');
})

//set up socket.io

const io = require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log("Connected...");

    socket.on('message',(msg)=>{
        //forward msg to everyone except the on who sent it
        socket.broadcast.emit('message',msg);
    })

})


