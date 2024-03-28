import userControllers from '../controllers/user-controllers';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const checkDuplication = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        if (req.query.email === undefined && req.query.uid === undefined) {
            res.status(400).json({ success: false, error: { message: 'Invalid url' } });
            return;
        }
        if (typeof req.query.email === 'string') {
            const response = await userControllers.get({ email: req.query.email });
            if (response === undefined) {
                res.status(200).json({ success: true });
                return;
            } else {
                res.status(409).json({
                    success: false,
                    error: { message: 'User already exists' },
                });
                return;
            }
        }
        if (typeof req.query.uid === 'string') {
            const response = await userControllers.get({ uid: req.query.uid });
            if (response === undefined) {
                res.status(200).json({ success: true });
                return;
            } else {
                res.status(409).json({
                    success: false,
                    error: { message: 'User already exists' },
                });
                return;
            }
        }
        res.status(400).json({ success: false, error: { message: 'Invalid url' } });
    } catch (error: any) {
        console.error('checkEmail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'checkEmail failed : server error' } });
    }
};

const checkProfileVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.data;
        if (user === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        if (user.verified === 1 && user.profile === 1) {
            next();
        } else if (user.profile === 0) {
            res.status(404).json({ success: false, error: { message: 'Profile not found' } });
        } else {
            res.status(401).json({ success: false, error: { message: 'User not verified' } });
        }
    } catch (error: any) {
        console.error('checkProfileVerify failed: ' + error.stack);
        res.status(500).json({
            success: false,
            error: { message: 'checkProfileVerify failed : server error' },
        });
    }
};

const get = async (req: Request, res: Response) => {
    try {
        if (req.params.id === undefined) {
            res.status(200).json({ success: true, data: req.data });
        } else {
            const user = await userControllers.get({ id: req.params.id });
            if (user === undefined) {
                res.status(404).json({ success: false, error: { message: 'User not found' } });
                return;
            } else {
                res.status(200).json({
                    success: true,
                    data: user,
                });
            }
        }
    } catch (error: any) {
        console.error('getUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getUser failed : server error' } });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        if (req.id === undefined) {
            res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
            return;
        }
        const user = req.data;
        if (user === undefined) {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
            return;
        }
        if (req.body.password) {
            if (!process.env.secret) throw new Error('secret not found');
            const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(req.body.password).digest('hex');
            req.body.password = cryptoPass;
        }
        if (req.body.email !== undefined && req.body.email !== user.email) {
            req.body.verified = 0;
        }
        if (user.profile === 0) {
            const response = await userControllers.createProfile(req.id, req.body);
            if (response) req.body['profile'] = 1;
        }
        const data = await userControllers.update(req.id, req.body);
        // const { password, verified, userId, profile, profileId, ...rest } = data;
        // if (verified === 1) {
        //     await elastic.update(req.id, rest);
        // }
        res.status(201).json({
            success: true,
            data: data,
        });
    } catch (error: any) {
        console.error('updateUser failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateUser failed : server error' } });
    }
};

const getRecommend = async (req: any, res: any) => {
    try {
        const user = await userControllers.getRecommend(req.id, req.query.tag);
        res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        console.error('getRecommend failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getRecommend failed : server error' } });
    }
};

export default { checkDuplication, get, update, checkProfileVerify, getRecommend };
