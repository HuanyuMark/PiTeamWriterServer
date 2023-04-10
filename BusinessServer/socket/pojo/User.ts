export class User {
    private socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }

    getSocketId() {
        return this.socketId;
    }
}

export class MsgMutation {
    private user: User;
    private operation: never;
    constructor(user: User, operation: never) {
        this.user = user;
        this.operation = operation;
    }

    getUser() {
        return this.user;
    }

    getOperation() {
        return this.operation;
    }
}

export class UserRecord {
    socketId: string;

    constructor(socketId: string) {
        this.socketId = socketId;
    }
}

export class MsgMutationRecord {
    user: UserRecord;
    operation: never;
    constructor(user: UserRecord, operation: never) {
        this.user = user;
        this.operation = operation;
    }
}