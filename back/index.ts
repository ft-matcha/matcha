import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import crud from './lib/crud';
import elastic from './lib/elastic';
import routers from './routers/index';
// import { Server } from 'socket.io';
// import chat from './socket/socket';
import cors from 'cors';
import { Request, Response } from 'express';
import passport from 'passport';
import initStartegy from './startegy/index';

const app = express();

const port = 8000;
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
};
const server = https.createServer(options, app);
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
initStartegy(passport);
new crud('').migrate();
elastic.createIndex('matcha');
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use('/api/v1', routers);
app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, error: { message: 'Not Found' } });
});
// const io = new Server(server, { cors: corsOptions });
// chat(io);
server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
