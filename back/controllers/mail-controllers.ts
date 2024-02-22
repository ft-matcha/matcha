import crypto from 'crypto';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export default class mailer {
    private static store: any = {};
    private email: string;

    constructor(email: string) {
        this.email = email;
    }
    getEmail = (): string => {
        return this.email;
    };
    sendEmail = async () => {
        try {
            const code = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
            mailer.store[this.email] = {
                code: code,
                expiration: Date.now() + 300000,
            };
            const mailOptions = {
                to: this.email,
                subject: 'Email Verification',
                text: code,
            };
            const response = await transporter.sendMail(mailOptions);
            console.log('Mail sent: ' + response.response);
        } catch (error: any) {
            console.error('Mail send failed: ' + error.stack);
            throw error;
        }
    };
    verifyEmail = (code: string) => {
        try {
            if (mailer.store[this.email] === undefined || mailer.store[this.email].expiration < Date.now()) {
                return false;
            } else if (mailer.store[this.email].code === code) {
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Mail verify failed: ' + error.stack);
            throw error;
        }
    };
}
