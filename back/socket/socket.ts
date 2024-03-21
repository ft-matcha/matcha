import messageControllers from '../controllers/message-controllers';
import jwt from '../utils/jwt';
import roomControllers from '../controllers/room-controllers';
import { Server, Socket } from 'socket.io';
import userControllers from '../controllers/user-controllers';
import alertControllers from '../controllers/alert-controllers';
const eventHandler = async (socket: Socket, error?: any) => {
    try {
        if (error) {
            console.error('eventHandler failed: ' + error.stack);
            return;
        }
        const { id, toId } = socket.handshake.headers;

        if (id === undefined || typeof id !== 'string' || toId === undefined || typeof toId !== 'string') {
            throw new Error('Invalid id');
        }
        const roomData = await roomControllers.get(id, toId);
        if (roomData === undefined) {
            throw new Error('room not found');
        }
        socket.join(roomData.roomId);
        await messageControllers.update(
            { from: id, to: toId, room: roomData.roomId, status: 'PENDING' },
            { status: 'READ' }
        );
        socket.on('message', async (msg: any) => {
            console.log(msg);
            socket.to(roomData.roomId).emit('message', {
                from: id,
                message: msg,
            });
            await messageControllers.create(
                {
                    from: id,
                    to: toId,
                    room: roomData.roomId,
                },
                msg,
                socket.rooms.size === 2 ? 'READ' : 'PENDING'
            );
            if (socket.rooms.size === 1) {
                await alertControllers.createAlert(id, toId, 'message', msg);
            }
        });

        socket.on('leave', (msg: any) => {
            socket.leave(roomData.roomId);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    } catch (error: any) {
        console.error('eventHandler failed: ' + error.stack);
    }
};

const authSocket = async (socket: Socket, next: any) => {
    try {
        console.log(socket.handshake.headers.auth);
        if (socket.handshake.headers.auth && typeof socket.handshake.headers.auth === 'string') {
            const token = socket.handshake.headers.auth.split('Bearer ')[1];
            const response = jwt.verify(token);
            if (response.status === false) {
                const decode = jwt.decode(token);
                next(socket, new Error('Expired Token'));
            } else if (typeof response.decoded === 'object') {
                if (response.decoded['id'] === undefined) {
                    next(socket, new Error('Invalid Token'));
                } else {
                    const user = await userControllers.getUser({ id: response.decoded['id'] });
                    if (user === undefined) {
                        next(socket, new Error('Invalid Token'));
                    }
                    socket.handshake.headers.user = user;
                    next(socket);
                }
            }
        } else {
            next(socket, new Error('token does not exist'));
        }
    } catch (error: any) {
        console.error('authSocket failed: ' + error.stack);
    }
};

const chat = (io: Server) => {
    io.on('connection', (socket) => {
        authSocket(socket, eventHandler);
    });
};
export default chat;
