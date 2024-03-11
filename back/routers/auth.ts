import userControllers from '../controllers/user-controllers';
import mailControllers from '../controllers/mail-controllers';
import elastic from '../lib/elastic';
const login = async (req: any, res: any) => {
    try {
        const response = await userControllers.login(req.body);
        if (response === undefined) {
            res.status(200).json({ success: false, error: { status: 404, message: 'User not found' } });
        } else if (response.success === false) {
            res.status(200).json(response);
        } else {
            const { accessToken, refreshToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: { accessToken: accessToken },
            });
        }
    } catch (error: any) {
        console.error('login failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, messgae: 'login failed : server error' } });
    }
};

const signup = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser({ email: req.body.email });
        if (user === undefined) {
            const response = await userControllers.createUser(req.body);
            console.log('signUp success');
            const { refreshToken, accessToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: { accessToken: accessToken },
            });
        } else {
            console.log('User already exists');
            res.status(200).json({
                success: false,
                error: { status: 409, message: 'User already exists' },
            });
        }
    } catch (error: any) {
        console.error('signUp failed: ' + error.stack);
        res.status(200).json({ succes: false, error: { status: 500, message: 'signUp failed : server error' } });
    }
};

const logout = async (req: any, res: any) => {
    try {
        const response = await userControllers.logout(req.email);
        if (response.success === false) {
            res.status(200).json(response);
        } else {
            res.clearCookie('refreshToken');
            res.status(201).json(response);
        }
    } catch (error: any) {
        console.error('logout failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'logout failed : server error' } });
    }
};

const sendEmail = async (req: any, res: any) => {
    try {
        const response = await userControllers.getUser({ id: req.id });
        if (response === undefined) {
            res.status(200).json({ success: false, error: { status: 401, message: 'User not found' } });
            return;
        } else if (response.verified === 1) {
            res.status(200).json({ success: false, error: { status: 409, message: 'User already verified' } });
            return;
        }
        const mailer = new mailControllers(req.email);
        await mailer.sendEmail();
        res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        console.error('sendMail failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'sendMail failed : server error' } });
    }
};

const verifyEmail = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser({ id: req.id });
        if (user === undefined) {
            res.status(200).json({ success: false, error: { status: 401, message: 'User not found' } });
            return;
        }
        if (user.verified === 1) {
            res.status(200).json({ success: false, error: { status: 409, message: 'User already verified' } });
            return;
        }
        const mailer = new mailControllers(req.email);
        const response = mailer.verifyEmail(req.params.code);
        if (response === true) {
            if (user.profile === 1) {
                const { id, password, profile, verified, userId, profileId, ...rest } = user;
                await elastic.update(req.email, rest);
            }
            await userControllers.updateUser(req.email, { verified: 1 });
            res.status(201).json({ success: true });
        } else {
            res.status(200).json({ success: false, error: { status: 401, message: 'Invalid code' } });
        }
    } catch (error: any) {
        console.error('verifyEmail failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'verifyEmail failed : server error' } });
    }
};

export default { login, logout, signup, sendEmail, verifyEmail };
