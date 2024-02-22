import userControllers from '../controllers/user-controllers';
import mailControllers from '../controllers/mail-controllers';
const login = async (req: any, res: any) => {
    try {
        const response = await userControllers.login(req.body);
        if (response.success === false) {
            res.status(401).json(response);
        } else {
            const { accessToken, refreshToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: { accessToken: accessToken },
            });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: { messgae: 'login failed : server error' } });
    }
};

const signup = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser(req.body.email);
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
            res.status(409).json({
                success: false,
                error: { message: 'User already exists' },
            });
        }
    } catch (error: any) {
        console.error('signUp failed: ' + error.stack);
        res.status(500).json({ succes: false, error: { message: 'signUp failed : server error' } });
    }
};

const logout = async (req: any, res: any) => {
    try {
        const response = await userControllers.logout(req.email);
        if (response.success === false) {
            res.status(401).json(response);
            return;
        } else {
            res.clearCookie('refreshToken');
            res.status(201).json(response);
        }
    } catch (error: any) {
        console.error('logout failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'logout failed : server error' } });
    }
};
const sendEmail = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser(req.email);
        if (user === undefined) {
            res.status(401).json({ success: false, error: { message: 'User not found' } });
            return;
        } else if (user.verified === true) {
            res.status(409).json({ success: false, error: { message: 'User already verified' } });
            return;
        }
        const mailer = new mailControllers(req.email);
        await mailer.sendEmail();
        res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        console.error('sendMail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'sendMail failed : server error' } });
    }
};

const verifyEmail = async (req: any, res: any) => {
    try {
        const user = await userControllers.getUser(req.email);
        if (user.verified === true) {
            res.status(409).json({ success: false, error: { message: 'User already verified' } });
            return;
        }
        const mailer = new mailControllers(req.email);
        const response = mailer.verifyEmail(req.params.code);
        if (response === true) {
            await userControllers.updateUser(req.email, { status: 'ACTIVE', verified: true });
            res.status(201).json({ success: true });
        } else {
            res.status(401).json({ success: false, error: { message: 'Invalid code' } });
        }
    } catch (error: any) {
        console.error('verifyEmail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'verifyEmail failed : server error' } });
    }
};

export default { login, logout, signup, sendEmail, verifyEmail };
