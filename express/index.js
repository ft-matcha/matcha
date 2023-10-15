require('dotenv').config();
const express = require('express');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
    transports: ['websocket'], // Use WebSocket as the transport
    withCredentials: true, // Disable sending cookies
};
app.use(cors(corsOptions));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
    socket.on('chat message', (msg) => {
        socket.emit('chat message', msg);
    });
});

app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));
app.use('/login', require('./routes/login'));
app.use('/verify', require('./routes/email-verification'));

server.listen(port, () => {
    console.log(`Express server on port ${port}!`);
});
