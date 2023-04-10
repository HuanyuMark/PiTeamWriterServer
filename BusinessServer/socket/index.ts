import http from 'http'
import { Server, Socket } from 'socket.io'
import { sendInputToServer } from './messageBoard'
import { MsgMutationRecord } from './pojo/User';
export enum SocketEvent {
    SEND_MSG_INPUT = 'c:/msg/input',
    GET_MSG_INPUT = 's:/msg/input',
    CONNECT = 'connection',
    DISCONNECT = 'disconnect',
}

let io: unknown = null;
const connectionListener = (socket: Socket) => {
    console.log(socket.id);
    socket.on(SocketEvent.GET_MSG_INPUT, (mutation: MsgMutationRecord) => sendInputToServer(socket, mutation))
}

export const initSocker = (server: http.Server): Server => {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    })
        .on(SocketEvent.CONNECT, connectionListener)

    return io as Server;
}

export const useSocker = (): Server => {
    return io as Server;
}


