import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import crud from './lib/crud';
import elastic from './lib/elastic';
import routers from './routers/index';
import { Server } from 'socket.io';
import cors from 'cors';

// import socket from './socket/socket';

const app = express();

const port = 8000;
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
};
const server = https.createServer(options, app);
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

new crud('').migrate();
elastic.createIndex('matcha');
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use('/api/v1', routers);
app.use((req: any, res: any) => {
    res.status(404).json({ success: false, error: { message: 'Not Found' } });
});
// const io = new Server(server);
// io.on('connection', socket.eventHandler);
server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
