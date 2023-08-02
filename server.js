const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.get('/',(req, res)=>{
    let option = {
        root: path.join(__dirname)
    }
    let fileName = 'index.html'
    res.sendFile(fileName, option);
})
let user = 0;

io.on('connection', (socket)=>{
    console.log('user connected.....');
    user++;

    socket.emit('newUser', {message : 'Hiii, Welcome to new user page...'});

    socket.broadcast.emit('newUser', {message: user + 'is connected....'});

    // setTimeout(()=>{
    //     socket.send('Welcome to express and socket io page')
    // },3000)

    // socket.on('message', (data)=>{
    //             console.log(data);
    //     })

    socket.emit('newMessage',{message: 'Sujal is Absent'})
    socket.on('disconnect', ()=>{
        console.log('user is disconnected.....')
        user--;
        socket.broadcast.emit('newUser', {message: user + 'is connected....'});
    })
})

server.listen(4545, ()=>{
    console.log('Server started at 4545');
})