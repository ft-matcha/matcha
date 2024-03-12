import crypto from 'crypto';
import nodemailer from 'nodemailer';
import redisClient from '../lib/redisClient';
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export default class mailer {
    constructor() {}

    sendEmail = async (email: string) => {
        try {
            const code = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
            redisClient.set(email, code, 300);
            const mailOptions = {
                to: email,
                subject: 'Email Verification',
                text: code,
            };
            console.log(code);
            const response = await transporter.sendMail(mailOptions);
            console.log('Mail sent: ' + response.response);
        } catch (error: any) {
            console.error('Mail send failed: ' + error.stack);
            throw error;
        }
    };
    verifyEmail = async (email: string, code: string) => {
        try {
            const redisCode = await redisClient.get(email);
            if (redisCode === null) {
                return false;
            } else if (redisCode === code) {
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Mail verify failed: ' + error.stack);
            throw error;
        }
    };
}
