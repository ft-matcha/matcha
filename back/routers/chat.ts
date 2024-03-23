import messageControllers from '../controllers/message-controllers';
import roomControllers from '../controllers/room-controllers';
import { Request, Response } from 'express';
const getHistory = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined || req.query.id === undefined || typeof req.query.id !== 'string') {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        // const history = await messageControllers.get({ from: req.id, to: req.query.id });
        // res.status(200).json({ success: true, data: history });
    } catch (error: any) {
        console.error('getHistory failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getHistory failed : server error' } });
    }
};

const getChatList = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const chatList = await roomControllers.getWithMessage(req.id);
        res.status(200).json({ success: true, data: chatList });
    } catch (error: any) {
        console.error('getChatList failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getChatList failed : server error' } });
    }
};

export default { getHistory, getChatList };
