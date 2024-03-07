import userControllers from '../controllers/user-controllers';
import alertControllers from '../controllers/alert-controllers';
const getProfileAlert = async (req: any, res: any) => {
    try {
        const user: any = await userControllers.getUser(req.email);

        if (user === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        const chatAlert = await alertControllers.getAlert(req.email, 'chat');
        const requestAlert = await alertControllers.getAlert(req.email, 'request');
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
