const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');

router.post('/', async (req, res) => {
    const user = await userController.getUser(req.body.id);
    if (!user) {
        console.log('signUp success');
        res.status(201).json(createUser(req.body));
    } else {
        console.log('User already exists');
        res.status(409).json({
            success: false,
            error: { message: 'User already exists' },
        });
    }
});

module.exports = router;
