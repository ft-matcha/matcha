const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.get('/:uid/:upass', async (req, res) => {
    const { uid, upass } = req.params;
    const password = crypto.createHmac('sha256', process.env.secret).update(upass).digest('hex');
    const User = await prisma.user.findUnique({
        where: { uid },
    });
    console.log(password);
    console.log(User.upass);
    if (!User) {
        res.json({ message: 'User does not exist' });
        return;
    } else if (User.upass === password) {
        res.json({ message: 'User logged in' });
    } else {
        res.json({ message: 'Invalid password' });
    }
});

module.exports = router;
