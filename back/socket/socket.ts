import messageControllers from '../controllers/message-controllers';
import jwt from '../utils/jwt';
const eventHandler = (socket: any) => {
    console.log(socket);
    const room = 1;
    socket.join(room);
    messageControllers.update(
        {
            from: socket.request.email,
            to: socket.requset.email,
        },
        { status: 'READ' }
    );
    socket.on('message', (msg: any) => {
        // messageControllers.createMessage({});
        if (socket.rooms.size === 1) {
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

const verifyJWT = async (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const response = jwt.verify(token);
            if (response.status === false) {
                const decode = jwt.decode(token);
                res.status(401).json({ success: false, error: { message: 'Expired Token' } });
                return;
            } else if (typeof response.decoded === 'object') {
                if (response.decoded['email'] === undefined) {
                    res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
                } else {
                    req.email = response.decoded['email'];
                    next();
                    return;
                }
            }
            res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
        } else {
            res.status(401).json({ success: false, error: { message: 'token does not exist' } });
        }
    } catch (error: any) {
        console.error('verifyJWT failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'verifyJWT failed : server error' } });
    }
};

export default { eventHandler };
