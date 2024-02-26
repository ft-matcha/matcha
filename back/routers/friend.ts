import friendControllers from '../controllers/friend-controllers';
import alertControllers from '../controllers/alert-controllers';
const requestFriend = async (req: any, res: any) => {
    try {
        const response = await friendControllers.createFriend(req.email, req.query.email);
        const alert = await alertControllers.createAlert(req.email, req.query.email, { type: 'request' });
        res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('requestFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'requestFriend failed : server error' } });
    }
};

const acceptFriend = async (req: any, res: any) => {
    try {
        const response = await friendControllers.updateFriend(req.email, req.query.email, 'ACCEPT');
        res.status(201).json({ success: true });
    } catch (error: any) {
        console.error('acceptFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'acceptFriend failed : server error' } });
    }
};

const getFriend = async (req: any, res: any) => {
    try {
        const response = await friendControllers.getFriend(req.email, 'ACCEPT');
        console.log(response);
        res.status(200).json({ success: true, data: response });
    } catch (error: any) {
        console.error('getFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getFriend failed : server error' } });
    }
};

export default {
    requestFriend,
    acceptFriend,
    getFriend,
};
