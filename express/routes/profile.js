const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controllers');

router.get('/:uid', async (req, res) => {
    const user = await profileController.getProfile(req);
    if (!user) {
        res.json({
            success: false,
            error: { message: 'Profile not found' },
        });
        return;
    }
    res.json({
        success: true,
        user,
    });
});

router.post('/', async (req, res) => {
    const target = await profileController.getProfile(req);
    if (target) {
        res.json({
            success: false,
            error: { message: 'Profile already exists' },
        });
    } else {
        const user = await profileController.createProfile(req);
        res.json({
            success: true,
            user: user,
        });
    }
});

router.post('/update', async (req, res) => {
    const user = await profileController.updateProfile(req);
    res.json({
        success: true,
        user: user,
    });
});

module.exports = router;
