const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const jwt = require('./jwt');

router.get('/:uid', async (req, res) => {
    const user = await userController.getUser(req);
    res.json(user);
});

router.post('/', async (req, res) => {
    const target = await userController.getUser(req);
    if (target) {
        res.json({ message: 'User already exists' });
    } else {
        const user = await userController.createUser(req);
        res.json(user);
    }
});

router.get('/', async (req, res) => {
    const user = req.cookies['login'];

    if (user) {
        const userData = jwt.verify(user);
        const userTest = await prisma.user.findMany({ where: { id: userData.id } });
        if (userTest) {
            res.status(200);
            return;
        }
    }
});

module.exports = router;
