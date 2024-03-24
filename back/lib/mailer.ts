import crypto from 'crypto';
import nodemailer from 'nodemailer';
import redisClient from './redisClient';
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

class mailer {
    send = async (id: string, email: string) => {
        try {
            const code = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
            redisClient.set(code, id, 300);
            const mailOptions = {
                to: email,
                subject: 'Email Verification',
                text: `link: http://localhost:3000/verify/${code}`,
            };
            const response = await transporter.sendMail(mailOptions);
            console.log('Mail sent: ' + response.response);
        } catch (error: any) {
            console.error('Mail send failed: ' + error.stack);
            throw error;
        }
    };
    verify = async (code: string) => {
        try {
            const redisCode = await redisClient.get(code);
            if (redisCode === null) {
                return false;
            } else {
                return redisCode;
            }
        } catch (error: any) {
            console.error('Mail verify failed: ' + error.stack);
            throw error;
        }
    };
}

export default new mailer();
