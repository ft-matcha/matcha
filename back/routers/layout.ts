import userControllers from '../controllers/user-controllers';
import alertControllers from '../controllers/alert-controllers';
import { Request, Response } from 'express';
const getProfileAlert = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const user = req.data;
        if (user === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        const chatAlert = await alertControllers.getAlert(req.id, 'chat');
        const requestAlert = await alertControllers.getAlert(req.id, 'request');
        res.status(200).json({
            success: true,
            data: {
                image: user.image[0],
                lastName: user.lastName,
                firstName: user.firstName,
                chatAlert: chatAlert,
                requestAlert: requestAlert,
            },
        });
    } catch (error: any) {
        console.error('getUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getUser failed : server error' } });
    }
};

export default { getProfileAlert };
