import express from 'express';
import auth from './auth';
import user from './user';
import apiDocs from '../docs/index';
import elastic from '../lib/elastic';
import jwt from './jwt';
import friend from './friend';
const router = express.Router();

apiDocs.init();
const { swaggerUI, specs, setUpOption } = apiDocs.getSwaggerOption();
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/register', user.checkEmail);
router.get('/logout', jwt.verifyJWT, auth.logout);
router.get('/user/:email', jwt.verifyJWT, user.get);
router.put('/user', jwt.verifyJWT, user.update);
router.get('/refresh', jwt.refreshJWT);
router.get('/email', jwt.verifyJWT, auth.sendEmail);
router.get('/email/:code', jwt.verifyJWT, auth.verifyEmail);
router.get('/firend', jwt.verifyJWT, friend.getFriend);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));

export default router;
