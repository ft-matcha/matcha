// const express = require('express');
// const router = express.Router();

// module.exports = (io) => {
//     router.get('/', (req, res) => {
//         io.on('connection', (socket) => {
//             console.log('a user connected');
//             socket.on('disconnect', () => {
//                 console.log('a user disconnected');
//             });
//             socket.on('chat message', (msg) => {
//                 socket.emit('chat message', msg);
//             });
//         });
//     });

//     return router;
// };
