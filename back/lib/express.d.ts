import { Request } from 'express';
import { Socket } from 'socket.io';

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
    namespace SocketIO {
        interface Socket {
            request: {
                id?: string;
            };
        }
    }
}
