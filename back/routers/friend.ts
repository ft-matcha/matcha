import friendControllers from '../controllers/friend-controllers';
import userControllers from '../controllers/user-controllers';

const requestFriend = async (req: any, res: any) => {
    try {
        const response = await friendControllers.requestFriend(req.user.id, req.params.id);
        res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('requestFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'requestFriend failed : server error' } });
    }
};

const acceptFriend = async (req: any, res: any) => {
    try {
        const response = await friendControllers.acceptFriend(req.user.id, req.params.id);
        res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('acceptFriend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'acceptFriend failed : server error' } });
    }
};

const getFriend = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser(req.email);
        const response = await friendControllers.getFriend(user.id);
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
