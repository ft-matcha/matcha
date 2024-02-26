import userControllers from '../controllers/user-controllers';
import profileControllers from '../controllers/profile-controllers';
import relationControllers from '../controllers/friend-controllers';
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

const checkProfileVerify = async (req: any, res: any, next: any) => {
    try {
        const response = await userControllers.getUser(req.email);
        if (response === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        console.log(response);
        if (response.verified === 1 && response.profile === 1) {
            next();
        } else if (response.profile === 0) {
            res.status(404).json({ success: false, error: { message: 'Profile not found' } });
        } else {
            res.status(404).json({ success: false, error: { message: 'User not verified' } });
        }
    } catch (error: any) {
        console.error('checkProfileVerify failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'checkProfileVerify failed : server error' } });
    }
};

const get = async (req: any, res: any) => {
    try {
        const response = await userControllers.getUser(req.params.email, true);
        if (response === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        } else {
            const { id, password, verified, userId, profileId, ...rest } = response;
            if (req.email === req.params.email) {
                rest['relaiton'] = 'me';
            } else {
                const relation = await relationControllers.getFriend({
                    fromUser: req.email,
                    toUser: req.params.email,
                });
                rest['relation'] = relation?.status;
            }
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
        if (user.profile === 0) {
            await profileControllers.createProfile(user.id, req.body);
            await userControllers.updateUser(req.email, { profile: true });
        }
        await userControllers.updateUser(req.email, req.body);
        const userData = await userControllers.getUser(req.email, true);
        console.log(userData);
        const { id, password, verified, userId, profileId, ...rest } = userData;
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

export default { checkEmail, get, update, checkProfileVerify };
