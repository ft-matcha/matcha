import express from 'express';
import auth from './auth';
import user from './user';
import apiDocs from '../docs/index';
import jwt from './jwt';
import relation from './relation';
import alert from './alert';
import layout from './layout';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.use(express.static('uploads'));

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
router.get('/recommend', jwt.verifyJWT, user.checkProfileVerify, user.getRecommend);

//jwt
router.get('/refresh', jwt.refreshJWT);
//realtion
router.get('/friend', jwt.verifyJWT, user.checkProfileVerify, relation.getFriend);
router.post('/friend/request', jwt.verifyJWT, user.checkProfileVerify, relation.requestFriend);
router.post('/hate', jwt.verifyJWT, user.checkProfileVerify, relation.hateUser);
router.put('/friend/accept', jwt.verifyJWT, user.checkProfileVerify, relation.acceptFriend);
//docs
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));

//layout
router.get('/layout', jwt.verifyJWT, user.checkProfileVerify, layout.getProfileAlert);
router.get('/tag', user.getTag);

export default router;
