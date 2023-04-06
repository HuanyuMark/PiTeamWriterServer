import express from 'express';
import path from 'path';
import http from 'http'

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initSocker } from './socket';
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//404page
app.use(function (req, res, next: Function) {
    res.send('[PiTeamWriter-BusinessServer]: 404');
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);

initSocker(server);

server.listen(port, () => {
    console.log(`[PiTeamWriter-BusinessServer] running at: http://127.0.0.1:${port}`);
})

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}