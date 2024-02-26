import express from 'express';
import auth from './auth';
import user from './user';
import apiDocs from '../docs/index';
import elastic from '../lib/elastic';
import jwt from './jwt';
import friend from './friend';
import alert from './alert';
const router = express.Router();

apiDocs.init();
const { swaggerUI, specs, setUpOption } = apiDocs.getSwaggerOption();
//auth
router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/user/:email', jwt.verifyJWT, user.checkProfileVerify, user.get);
router.get('/logout', jwt.verifyJWT, auth.logout);
router.get('/email', jwt.verifyJWT, auth.sendEmail);
router.get('/email/:code', jwt.verifyJWT, auth.verifyEmail);
//user
router.get('/register', user.checkEmail);
router.put('/user', jwt.verifyJWT, user.update);
//jwt
router.get('/refresh', jwt.refreshJWT);
//realtion
router.get('/friend', jwt.verifyJWT, user.checkProfileVerify, friend.getFriend);
router.get('/friend/request', jwt.verifyJWT, user.checkProfileVerify, friend.requestFriend);
router.get('/friend/accept', jwt.verifyJWT, user.checkProfileVerify, friend.acceptFriend);
//alert
router.get('/alert/get', jwt.verifyJWT, alert.getAlert);
//docs
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));

export default router;
