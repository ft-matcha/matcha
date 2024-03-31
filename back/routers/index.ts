import express from 'express';
import auth from './auth';
import user from './user';
import apiDocs from '../docs/index';
import jwt from './jwt';
import relation from './relation';
import layout from './layout';
import chat from './chat';
import passport from 'passport';
import login from './login';
import register from './register';
import multer from 'multer';
import { Request, Response } from 'express';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
// router.use(express.static('uploads'));

apiDocs.init();
const { swaggerUI, specs, setUpOption } = apiDocs.getSwaggerOption();
//auth
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpOption));
router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/register', register);
router.get('/googleLogin', passport.authenticate('google', { session: false, scope: ['email', 'profile', 'address'] }));
router.get('/oauth', passport.authenticate('google', { session: false }), login);
router.get('/register', user.checkDuplication);
router.get('/refresh', jwt.refreshJWT);

router.put('/test', upload.array('image', 5), (req: Request, res: Response) => {
    console.log(req.files);
    res.json(req);
});

router.use(jwt.verifyJWT);
router.get('/logout', auth.logout);
router.get('/email', auth.sendEmail);
router.get('/email/:code', auth.verifyEmail);
router.get('/user', user.get);
router.put('/user', user.update);
router.get('/message', chat.getHistory);

router.use(user.checkProfileVerify);
router.get('/user/:email', user.get);
router.get('/recommend', user.getRecommend);
router.get('/friend', relation.getFriend);
router.post('/friend/request', relation.requestFriend);
router.put('/friend/accept', relation.acceptFriend);
router.post('/hate', relation.hateUser);
router.get('/layout', layout.getProfileAlert);

export default router;
