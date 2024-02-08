import { Request, Response } from 'express';
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const login = async (req: Request, res: Response) => {
    try {
        const response = await userController.login(req.body);
        if (response.success === false) {
            res.status(401).json(response);
        } else {
            res.status(201).json(response);
        }
    } catch (error: any) {
        console.error('login failed: ' + error.stack);
        res.status(500).json({ success: false, error: { messgae: 'login failed : server error' } });
    }
};

const signup = async (req: Request, res: Response) => {
    try {
        const user = await userController.getUser(req.body.email);
        if (!user) {
            console.log('signUp success');
            const response = await userController.createUser(req.body);
            res.status(201).json(response);
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
