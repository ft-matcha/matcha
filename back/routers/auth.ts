const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

const login = async (req: any, res: any) => {
    try {
        const response = await userController.login(req.body);
        if (response.success === false) {
            res.status(401).json(response);
        } else {
            const { accessToken, refreshToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: {
                    accessToken,
                },
            });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: { messgae: 'login failed : server error' } });
    }
};

const signup = async (req: any, res: any) => {
    try {
        const user = await userController.getUser(req.body.email);
        if (!user) {
            const response = await userController.createUser(req.body);
            console.log('signUp success');
            const { refreshToken, accessToken } = response;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: { accessToken },
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

exports.login = login;
exports.signup = signup;
export {};
