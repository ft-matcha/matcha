const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const jwt = require('../utils/jwt');
const { verifyJWT } = require('../controllers/jwt-controller');
router.post('/', async (req, res) => {
    const response = await userController.checkPassword(req.body);
    if (response.success === false) {
        res.status(401).json(response);
    } else {
        console.log(response);
        res.status(201).json({ success: true, accessToken: response.accessToken, refreshToken: response.refreshToken });
    }
});

router.get('/verify', verifyJWT);

module.exports = router;
