const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('./jwt');

router.get('/:uid/:upass', async (req, res) => {
    const { uid, upass } = req.params;
    const password = crypto.createHash('sha256', process.env.secret).update(upass).digest('hex');
    const User = await prisma.user.findUnique({
        where: { uid },
    });

    if (!User) {
        res.json({
            success: false,
            error: { message: 'User not found' },
        });
    } else if (User.upass === password) {
        res.status(200).cookie('login', jwt.sign(User));
        const cookie = req.cookies['login'];
        res.json({
            success: true,
            cookie: cookie,
        });
    } else {
        res.json({
            success: false,
            error: { message: 'Incorrect password' },
        });
    }
});

module.exports = router;
