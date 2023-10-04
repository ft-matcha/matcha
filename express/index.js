const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/user', require('./routes/user'));

app.listen(port, () => {
    console.log('Express server on port 3000!');
});
