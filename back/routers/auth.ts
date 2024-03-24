import userControllers from '../controllers/user-controllers';
import elastic from '../lib/elastic';
import { Request, Response } from 'express';
import redisClient from '../lib/redisClient';
import crypto from 'crypto';
import jwt from '../utils/jwt';
import mailer from '../lib/mailer';

const login = async (req: Request, res: Response) => {
    try {
        const user = await userControllers.getUser({ uid: req.body.uid });
        if (user === undefined) {
            console.log('User not found');
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        if (!process.env.secret) throw new Error('secret not found');
        const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(req.body.password).digest('hex');
        if (user.password !== cryptoPass) {
            console.log('Incorrect password');
            res.status(401).json({ success: false, error: { message: 'Incorrect password' } });
        } else {
            const accessToken = jwt.sign(user.id);
            const refreshToken = await jwt.refresh();
            await userControllers.updateUser(user.id, { status: 'ACTIVE' });
            await redisClient.set(user.id, refreshToken);
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

const register = async (req: Request, res: Response) => {
    try {
        const user = await userControllers.getUser({ uid: req.body.uid });
        if (user === undefined) {
            const response = await userControllers.createUser(req.body);
            console.log('register success');
            const { id, refreshToken, accessToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            await mailer.send(id, req.body.email);
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
        console.error('register failed: ' + error.stack);
        res.status(500).json({ succes: false, error: { message: 'register failed : server error' } });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined || req.data === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid id' } });
            return;
        }
        const user = req.data;
        if (user.status === 'ACTIVE') {
            await redisClient.del(user.id);
            await userControllers.updateUser(user.id, { status: 'INACTIVE' });
            res.status(201).json({ success: true });
        } else {
            res.status(409).json({ success: false, error: { message: 'User already logged out' } });
        }
    } catch (error: any) {
        console.error('logout failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'logout failed : server error' } });
    }
};

export default { login, logout, register };
