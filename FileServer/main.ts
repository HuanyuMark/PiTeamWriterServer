import express from 'express';
import path from 'path';
import http from 'http'
//@ts-ignore
import { logger } from './utils/httpRequestLogger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import { exit } from 'process';
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//@ts-ignore
app.use(logger(process.env.LOGGER_OPEN || process.env.NODE_ENV));
// exit
//404page
app.use(function (req, res, next: Function) {
    res.send('[PiTeamWriter-FileServer]: Not Found File');
});

const port = normalizePort(process.env.PORT || '2999');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`[PiTeamWriter-FileServer] running at: http://127.0.0.1:${port}`);
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