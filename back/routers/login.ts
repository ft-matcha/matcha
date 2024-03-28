import { Request, Response } from 'express';
import jwt from '../utils/jwt';
import redisClient from '../lib/redisClient';
import userControllers from '../controllers/user-controllers';
const login = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        console.log(user);
        if (user === undefined) {
            res.status(401).json({ success: false, error: { message: 'User not found' } });
            return;
        } else {
            const accessToken = jwt.sign(user.id);
            const refreshToken = jwt.refresh();
            await userControllers.update(user.id, { status: 'ACTIVE' });
            await redisClient.set(user.id, refreshToken);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({ success: true, data: { accessToken: accessToken } });
        }
    } catch (error: any) {
        console.error('login failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'login failed : server error' } });
    }
};
export default login;
