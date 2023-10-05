const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controllers');

router.get('/:uid', async (req, res) => {
    const user = await profileController.getProfile(req);
    res.json(user);
});

router.post('/', async (req, res) => {
    const target = await profileController.getProfile(req);
    if (target) {
        res.json({ message: 'Profile already exists' });
    } else {
        const user = await profileController.createProfile(req);
        res.json(user);
    }
});

module.exports = router;
