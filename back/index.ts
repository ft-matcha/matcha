import { Request, Response } from 'express';

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
};
// const dotenv = require('dotenv');
// dotenv.config({ path: path.join(__dirname, '../.env') });
const Crud = require('./lib/crud');
new Crud().migrate();
const elastic = require('./lib/elastic');
elastic.createIndex('matcha');
const routers = require('./routers/index');
app.use(bodyParser.json());
app.use('/api/v1', routers);
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
