const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    });

    socket.on('send-chat-message', message => {
        const userName = users[socket.id];
        socket.broadcast.emit('chat-message', { name: userName, message: message });
    });

    socket.on('disconnect', () => {
        const userName = users[socket.id];
        socket.broadcast.emit('user-disconnected', userName);
        delete users[socket.id];
    });
});



//everytime a user loadsup the website its going to call this function and its going to give each one of these users their own socket