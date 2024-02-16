"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
router.get('/elastic/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        console.log('elastic');
        const elastic = require('../lib/elastic');
        const body = yield elastic.get(id);
        res.status(200).json({ success: true, body });
    }
    catch (error) {
        console.error('elastic failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'elastic failed : server error' } });
    }
}));
router.get('/search/:key/:query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.key;
    const query = req.params.query;
    try {
        console.log('search');
        const elastic = require('../lib/elastic');
        const body = yield elastic.search(key, query);
        console.log(body);
        res.status(200).json({ success: true, body });
    }
    catch (error) {
        console.error('search failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'search failed : server error' } });
    }
}));
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));
module.exports = router;
