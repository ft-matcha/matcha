const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
    },
});

// router.get('/register', (req, res) => {
//     res.send(`
//     <form method="POST" action="/verification/register">
//       <input type="email" name="email" placeholder="Email" required>
//       <input type="submit" value="Register">
//     </form>
//   `);
// });

router.post('/email', (req, res) => {
    const email = req.body.email;

    console.log(email);
    const verificationToken = Math.random().toString(36).substr(2, 10);
    const mailOptions = {
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent. Check your inbox.');
        }
    });
});

router.get('/:token', (req, res) => {
    const token = req.params.token;

    res.send('Email verified successfully!');
});

module.exports = router;
