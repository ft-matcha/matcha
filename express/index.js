require('dotenv').config();
const express = require('express');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const chat = require('./routes/chat');
const server = http.createServer(app);
const io = chat(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    transports: ['websocket'],
    withCredentials: true,
};
app.use(cors(corsOptions));

app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));
app.use('/login', require('./routes/login'));
app.use('/verify', require('./routes/email-verification'));

server.listen(port, () => {
    console.log(`Express server on port ${port}!`);
});
