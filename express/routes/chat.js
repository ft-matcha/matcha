const socketIo = require('socket.io');
const http = require('http');

const chatSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
        socket.on('chat message', (msg) => {
            socket.emit('chat message', msg);
        });
    });

    return io;
};

module.exports = chatSocket;
