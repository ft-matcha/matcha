import { Request, Response } from 'express';
const profileController = require('../controllers/profile-controllers');

const createProfile = async (req: Request, res: Response) => {
    try {
        const response = await profileController.createProfile(req.body);
        res.status(201).json(response);
    } catch (error: any) {
        console.error('createProfile failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'createProfile failed : server error' } });
    }
};

const updateProfile = async (req: Request, res: Response) => {
    try {
        const response = await profileController.updateProfile(req.body);
        res.status(201).json(response);
    } catch (error: any) {
        console.error('updateProfile failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateProfile failed : server error' } });
    }
};

exports.createProfile = createProfile;
exports.updateProfile = updateProfile;

export {};
