import { NextFunction } from 'express';
import messageControllers from '../controllers/message-controllers';
import alertControllers from '../controllers/alert-controllers';
import { Request } from 'express';
import jwt from '../utils/jwt';
import roomControllers from '../controllers/room-controllers';
import { Server, Socket } from 'socket.io';
const eventHandler = async (socket: any, error: any) => {
    try {
        if (error) {
            console.error('eventHandler failed: ' + error.stack);
            return;
        }
        const req = socket.request as Request;
        console.log(req.id);

        if (req.id === undefined || req.query === undefined || typeof req.query.id !== 'string') {
            return;
        }
        const roomData = await roomControllers.get(req.id, req.query.id ? req.query.id : '');
        if (roomData === undefined) {
            return new Error('room not found');
        }
        socket.join(roomData.roomId);
        await messageControllers.update(
            { from: req.id, to: req.query.id, room: roomData.roomId, status: 'PENDING' },
            { status: 'READ' }
        );

        socket.on('message', (msg: any) => {
            console.log(socket.handshake.auth);
            console.log(msg);
            // if (req.id === undefined || req.query.id === undefined || typeof req.query.id !== 'string') {
            //     return;
            // }
            // await messageControllers.create({ from: req.id, to: req.query.id, room: roomData.roomId }, msg);
            // if (socket.rooms.size === 2) {
            //     socket.to(roomData.roomId).emit('message', msg);
            // } else {
            //     await alertControllers.createAlert(req.id, req.query.id, 'chat', msg);
            // }
        });

        // socket.on('leave', (msg: any) => {
        //     socket.to(roomData.roomId).emit('leave', msg);
        //     if (socket.rooms.size === 2) {
        //         socket.to(roomData.roomId).emit('leave', msg);
        //     }
        // });

        socket.on('disconnect', () => {
            // socket.leave(roomData.roomId);
            console.log('user disconnected');
        });
    } catch (error: any) {
        console.error('eventHandler failed: ' + error.stack);
        socket.emit('error', { message: 'eventHandler failed : server error' });
    }
};

const authSocket = async (socket: Socket, next: any) => {
    try {
        console.log(next);
        console.log(socket.handshake.headers.auth);
        if (socket.handshake.headers.auth && typeof socket.handshake.headers.auth === 'string') {
            const token = socket.handshake.headers.auth.split('Bearer ')[1];
            const response = jwt.verify(token);
            if (response.status === false) {
                const decode = jwt.decode(token);
                next(new Error('Expired Token'));
                return;
            } else if (typeof response.decoded === 'object') {
                if (response.decoded['id'] === undefined) {
                    next(new Error('Invalid Token'));
                } else {
                    socket.request.id = response.decoded['id'];
                    next();
                    return;
                }
            }
        } else {
            next(new Error('token does not exist'));
        }
    } catch (error: any) {
        console.error('authSocket failed: ' + error.stack);
    }
};

// export default { eventHandler, authSocket };
const chat = (io: Server) => {
    io.on('connection', (socket) => {
        authSocket(socket, eventHandler);
    });
};
export default chat;
