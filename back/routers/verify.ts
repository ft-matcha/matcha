import { Request, Response } from 'express';
import userControllers from '../controllers/user-controllers';
import mailer from '../lib/mailer';

const sendEmail = async (req: Request, res: Response) => {
    try {
        const user = req.data;
        if (user === undefined) {
            res.status(401).json({ success: false, error: { message: 'User not found' } });
        } else if (user.verified === 1) {
            res.status(409).json({ success: false, error: { message: 'User already verified' } });
        } else {
            await mailer.send(user.id, user.email);
            res.status(201).json({
                success: true,
            });
        }
    } catch (error: any) {
        console.error('sendMail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'sendMail failed : server error' } });
    }
};

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const verify = await mailer.verify(req.params.code);
        if (verify !== false) {
            await userControllers.updateUser(verify, { verified: 1 });
            res.status(201).json({ success: true });
        } else {
            res.status(401).json({ success: false, error: { message: 'Invalid code' } });
        }
    } catch (error: any) {
        console.error('verifyEmail failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'verifyEmail failed : server error' } });
    }
};

export default { sendEmail, verifyEmail };
