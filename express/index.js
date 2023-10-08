require('dotenv').config();
const express = require('express');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));
app.use('/login', require('./routes/login'));
app.use('/verify', require('./routes/email-verification'));

app.listen(port, () => {
    console.log(`Express server on port ${port}!`);
});
