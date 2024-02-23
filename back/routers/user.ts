import userControllers from '../controllers/user-controllers';
import profileControllers from '../controllers/profile-controllers';
import elastic from '../lib/elastic';

const checkEmail = async (req: any, res: any) => {
    console.log(req.query);
    try {
        if (req.query['email']) {
            const response = await userControllers.getUser(req.query.email);
            if (response === undefined) {
                res.status(200).json({ success: true });
                return;
            }
            res.status(404).json({
                success: false,
                error: { message: 'User already exists' },
            });
        } else {
            res.status(400).json({ success: false, error: { message: 'Invalid email' } });
        }
    } catch (error: any) {
        console.error('checkEmail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'checkEmail failed : server error' } });
    }
};

const get = async (req: any, res: any) => {
    try {
        const response = await userControllers.getUser(req.params.email);
        if (response === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        } else {
            const { id, password, verified, userId, idx, ...rest } = response;
            res.status(200).json({
                success: true,
                data: rest,
            });
        }
    } catch (error: any) {
        console.error('getUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getUser failed : server error' } });
    }
};

const update = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser(req.email);
        if (user.userId === null) {
            await profileControllers.createProfile(user.id, req.body);
        }
        await userControllers.updateUser(req.email, req.body);
        const userData = await userControllers.getUser(req.email);
        console.log(userData);
        const { id, password, verified, userId, idx, ...rest } = userData;
        await elastic.update(req.email, rest);
        res.status(201).json({
            success: true,
            data: rest,
        });
    } catch (error: any) {
        console.error('updateUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateUser failed : server error' } });
    }
};

export default { checkEmail, get, update };
