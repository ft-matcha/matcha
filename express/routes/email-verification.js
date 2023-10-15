const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
let linkStore = {};
const crypto = require('crypto');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
    },
});

router.post('/email', (req, res) => {
    const email = req.body.email;
    linkStore = {};

    console.log(email);
    const linkToken = crypto.randomBytes(20).toString('hex');

    linkStore[linkToken] = {
        email,
        expiration: Date.now() + 30000,
    };
    const mailOptions = {
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:9000/verify/${linkToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({
                success: false,
                error: { message: 'Email not sent' },
            });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                success: true,
                message: 'Email sent',
            });
        }
    });
});

router.get('/:token', (req, res) => {
    const token = req.params.token;

    const linkData = linkStore[token];
    if (!linkData) {
        res.json({
            success: false,
            error: { message: 'Invalid link' },
        });
    } else {
        res.cookie('verify', token);
        res.redirect('http://localhost:3000');
    }
});

module.exports = router;
