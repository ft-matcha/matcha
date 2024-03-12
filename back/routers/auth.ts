import userControllers from '../controllers/user-controllers';
import mailControllers from '../controllers/mail-controllers';
import elastic from '../lib/elastic';
import { Request, Response } from 'express';
const mailer = new mailControllers();

const login = async (req: Request, res: Response) => {
    try {
        const response = await userControllers.login(req.body);
        if (response === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
        } else if (response.success === false) {
            res.status(404).json(response);
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
        res.status(500).json({ success: false, error: { messgae: 'login failed : server error' } });
    }
};

const signup = async (req: Request, res: Response) => {
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

const logout = async (req: Request, res: Response) => {
    try {
        const response = await userControllers.logout(req.id);
        if (response.success === false) {
            res.status(400).json(response);
        } else {
            res.clearCookie('refreshToken');
            res.status(201).json(response);
        }
    } catch (error: any) {
        console.error('logout failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'logout failed : server error' } });
    }
};

const sendEmail = async (req: Request, res: Response) => {
    try {
        const user = await userControllers.getUser({ id: req.id });
        if (user === undefined) {
            res.status(401).json({ success: false, error: { message: 'User not found' } });
            return;
        } else if (user.verified === 1) {
            res.status(409).json({ success: false, error: { message: 'User already verified' } });
            return;
        }
        await mailer.sendEmail(user.email);
        res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        console.error('sendMail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'sendMail failed : server error' } });
    }
};

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const user = await userControllers.getUser({ id: req.id });
        if (user === undefined) {
            res.status(401).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        if (user.verified === 1) {
            res.status(409).json({ success: false, error: { message: 'User already verified' } });
            return;
        }
        const response = await mailer.verifyEmail(user.email, req.params.code);
        if (response === true) {
            if (user.profile === 1) {
                const { id, password, profile, verified, userId, profileId, ...rest } = user;
                await elastic.update(user.email, rest);
            }
            await userControllers.updateUser(user.email, { verified: 1 });
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
