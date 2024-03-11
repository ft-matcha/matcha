import userControllers from '../controllers/user-controllers';
import alertControllers from '../controllers/alert-controllers';
const getProfileAlert = async (req: any, res: any) => {
    try {
        const user: any = await userControllers.getUser({ id: req.id });

        if (user === undefined) {
            res.status(200).json({ success: false, error: { status: 404, message: 'User not found' } });
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
        res.status(200).json({ success: false, error: { status: 500, message: 'getUser failed : server error' } });
    }
};

export default { getProfileAlert };
