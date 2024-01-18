const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const jwt = require('../utils/jwt');

router.get('/:uid', async (req, res) => {
    const user = await userController.getUser(req.params.uid);
    console.log(user);
    if (!user) {
        res.json({
            success: false,
            error: { message: 'User not found' },
        });
    } else {
        res.json({
            success: true,
            user: user,
        });
    }
});

router.post('/', async (req, res) => {
    const target = await userController.getUser(req.body.uid);
    if (target) {
        res.json({
            success: false,
            error: { message: 'User already exists' },
        });
    } else {
        const user = await userController.createUser(req.body);
        res.json({
            success: true,
            user: user,
        });
    }
});

router.get('/', async (req, res) => {
    const user = req.cookies['login'];

    if (user) {
        const userData = jwt.verify(user);
        console.log(userData);
        const userTest = await userController.getUser(userData.uid);
        if (userTest) {
            res.status(200).json({
                success: true,
                user: userData,
            });
        } else {
            res.status(401).json({
                success: false,
                error: { message: 'User not found' },
            });
        }
    } else {
        res.status(401).json({
            success: false,
            error: { message: 'Unauthorized' },
        });
    }
});

router.post('/update', async (req, res) => {
    const before = await userController.getUser(req.body.uid);
    if (!before) {
        res.json({
            success: false,
            error: { message: 'User not found' },
        });
    } else if (userController.bodyCheck(req.body, before)) {
        res.json({
            success: false,
            error: { message: 'Nothing to update' },
        });
    } else {
        const user = await userController.updateUser(req.body);
        res.json({
            success: true,
            user: user,
        });
    }
});

router.post('/delete', async (req, res) => {
    const data = await userController.getUser(req.body.uid);
    console.log(data);
    if (!data) {
        res.json({
            success: false,
            error: { message: 'User not found' },
        });
    } else {
        const user = await userController.deleteUser(data);
        res.json({
            success: true,
            user: user,
        });
    }
});

module.exports = router;
