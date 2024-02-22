import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import crud from './lib/crud';
import elastic from './lib/elastic';
import routers from './routers/index';
const app = express();
const port = 8000;
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
};
new crud('').migrate();
elastic.createIndex('matcha');
app.use(bodyParser.json());
app.use('/api/v1', routers);
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
