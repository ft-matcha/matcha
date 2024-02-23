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
        }
        const profile = await profileControllers.getProfile(response.id);
        let { id, password, verified, ...rest } = response;
        if (profile) {
            const { userId, id, ...profileRest } = profile;
            rest = { ...rest, ...profileRest };
        }
        res.status(200).json({
            success: true,
            data: rest,
        });
    } catch (error: any) {
        console.error('getUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getUser failed : server error' } });
    }
};

const update = async (req: any, res: any) => {
    try {
        const { password, firstName, lastName, address, phone, status, ...rest } = req.body;
        const user = {
            password,
            firstName,
            lastName,
            address,
            phone,
            status,
        };
        await userControllers.updateUser(req.email, user);
        await profileControllers.updateProfile(req.email, rest);
        const userData = await userControllers.getUser(req.email);
        const profileData = await profileControllers.getProfile(userData.id);
        let { id, password: pass, ...restUser } = userData;
        let { id: profileId, userId, ...restProfile } = profileData;
        const data = { ...restUser, ...restProfile };
        await elastic.update(req.email, data);
        res.status(201).json({
            success: true,
            data: data,
        });
    } catch (error: any) {
        console.error('updateUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateUser failed : server error' } });
    }
};

export default { checkEmail, get, update };
