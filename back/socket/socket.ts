import messageControllers from '../controllers/message-controllers';
const eventHandler = (socket: any) => {
    console.log(socket);
    // const chatRoom = new chat(socket.id, socket.requset._query.email);
    console.log(socket.id, socket.request._query.email);
    socket.on('message', (msg: any) => {
        // messageControllers.createMessage({});
        if (socket.rooms.size === 1) {
            // chatRoom.messageAlert(msg, socket.id);
        } else {
            // socket.to(room).emit('message', msg);
        }
    });
    socket.on('leave', (msg: any) => {
        // socket.to(room).emit('leave', msg);
        if (socket.rooms.size === 2) {
            // socket.to(room).emit('leave', msg);
        }
    });
    socket.on('disconnect', () => {
        // socket.leave(room);
        console.log('user disconnected');
    });
};

export default eventHandler;
