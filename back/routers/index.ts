const auth = require('./auth');
const profile = require('./profile');
const express = require('express');
const router = express.Router();
const ApiDocs = require('../docs/index');
const apiDocs = new ApiDocs();
apiDocs.init();
const { swaggerUI, specs, setUpOption } = apiDocs.getSwaggerOption();
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/profile/create', profile.create);
router.get('/elastic/:id', async (req: any, res: any) => {
    const id = req.params.id;
    try {
        console.log('elastic');
        const elastic = require('../lib/elastic');
        const body = await elastic.get(id);
        res.status(200).json({ success: true, body });
    } catch (error: any) {
        console.error('elastic failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'elastic failed : server error' } });
    }
});
router.get('/search/:key/:query', async (req: any, res: any) => {
    const key = req.params.key;
    const query = req.params.query;
    try {
        console.log('search');
        const elastic = require('../lib/elastic');
        const body = await elastic.search(key, query);
        console.log(body);
        res.status(200).json({ success: true, body });
    } catch (error: any) {
        console.error('search failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'search failed : server error' } });
    }
});
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));

module.exports = router;
export {};
