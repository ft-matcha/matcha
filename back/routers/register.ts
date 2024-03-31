import { Request, Response } from 'express';
import crypto, { randomUUID } from 'crypto';
import userControllers from '../controllers/user-controllers';
import jwt from '../utils/jwt';
import redisClient from '../lib/redisClient';
const register = async (req: Request, res: Response) => {
    try {
        if (process.env.secret === undefined) throw new Error('secret not found');
        const id = randomUUID();
        const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(req.body.password).digest('hex');
        const user = await userControllers.create({
            ...req.body,
            id: id,
            password: cryptoPass,
        });
        const accessToken = jwt.sign(user.id);
        const refreshToken = jwt.refresh();
        redisClient.set(user.id, refreshToken);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(201).json({ success: true, data: { accessToken: accessToken } });
    } catch (error: any) {
        console.error('register failed: ' + error.stack);
        res.status(500).json({ succes: false, error: { message: 'register failed : server error' } });
    }
};

export default register;
