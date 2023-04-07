import http from 'http'
import { Server, Socket } from 'socket.io'

let io: Server = null;
const connectionListener = (socket: Socket) => {

}

export const initSocker = (server: http.Server): Server => {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
        .on('connection', connectionListener)

    return io;
}

export const useSocker = (): Server => {
    return io;
}