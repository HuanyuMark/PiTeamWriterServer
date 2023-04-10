#! /usr/bin/env node
import express from 'express';
import path from 'path';
import http from 'http';
//@ts-ignore
import { logger } from './utils/httpRequestLogger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = normalizePort(process.env.PORT || '2999');

const expressApp = express()
    .use(cors())
    .use(express.static(path.join(__dirname, 'static')))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    //@ts-ignore
    .use(logger(process.env.LOGGER_OPEN || process.env.NODE_ENV))

    //404page
    .use((req, res, next: Function) => {
        res.send('[PiTeamWriter-FileServer]: Not Found File');
    })

    .set('port', port);

const server = http.createServer(expressApp);

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

    throw new TypeError(`Invalid port: ${val}`);
}