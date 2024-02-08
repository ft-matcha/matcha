const auth = require('./auth');
const express = require('express');
const router = express.Router();
const ApiDocs = require('../docs/index');
const apiDocs = new ApiDocs();
apiDocs.init();
const { swaggerUI, specs, setUpOption } = apiDocs.getSwaggerOption();
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));

module.exports = router;
export {};
