const express = require('express');
const router = express.Router();
const jwt = require('../controllers/jwt-controller');

router.get('', jwt.refreshJWT);

module.exports = router;
