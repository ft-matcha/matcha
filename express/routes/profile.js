const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile-controllers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:uid', async (req, res) => {
    const profile = await profileController.getProfile(req.params.uid);
    if (!profile) {
        res.json({
            success: false,
            error: { message: 'Profile not found' },
        });
    } else {
        res.json({
            success: true,
            profile,
        });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const target = await profileController.getProfile(req.body.user);
    console.log(target);
    if (target.length !== 0) {
        res.json({
            success: false,
            error: { message: 'Profile already exists' },
        });
    } else {
        const profile = await profileController.createProfile(req);
        res.json({
            success: true,
            profile: profile,
        });
    }
});

router.post('/update', async (req, res) => {
    const profile = await profileController.updateProfile(req);
    res.json({
        success: true,
        profile: profile,
    });
});

module.exports = router;
