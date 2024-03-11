import messageControllers from '../controllers/message-controllers';

const getHistory = async (req: any, res: any) => {
    try {
        const history = await messageControllers.get(req.email, req.query.email);
        res.status(200).json({ success: true, data: history });
    } catch (error: any) {
        console.error('getHistory failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'getHistory failed : server error' } });
    }
};

const getChatList = async (req: any, res: any) => {
    try {
        const chatList = await messageControllers.get(req.email);
        res.status(200).json({ success: true, data: chatList });
    } catch (error: any) {
        console.error('getChatList failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'getChatList failed : server error' } });
    }
};

export default { getHistory, getChatList };
