export interface ServerToClientEvents {
    newMessage: (a: SocketData) => void;
}

export interface ClientToServerEvents {
    sendMessage: (a: SocketData) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    userId: number;
    userName: string;
    message: string
}
