import { Socket } from 'socket.io'
import { SocketEvent } from '.'
import { MsgMutationRecord } from './pojo/User';

export const sendInputToServer = (socket: Socket, mutation: MsgMutationRecord) => {
    socket.broadcast.emit(SocketEvent.SEND_MSG_INPUT, mutation);
}