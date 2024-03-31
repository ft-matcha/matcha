import { Strategy } from 'passport-local';
import crypto from 'crypto';
import userControllers from '../controllers/user-controllers';
const LocalStrategy = new Strategy(
    {
        usernameField: 'uid',
        passwordField: 'password',
    },
    async (uid: string, password: string, done: any) => {
        console.log('LocalStrategy');
        try {
            if (process.env.secret === undefined) {
                return done(new Error('secret not found'));
            }
            if (uid === undefined || password === undefined) {
                return done(null, false, { message: 'Invalid uid or password' });
            }
            const user = await userControllers.get({ uid: uid });
            if (user === undefined) {
                return done(null, false, { message: 'Invalid uid or password' });
            } else if (
                user.password === crypto.createHmac('sha256', process.env.secret).update(password).digest('hex')
            ) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid uid or password' });
            }
        } catch (error: any) {
            console.error('LocalStrategy failed: ' + error.stack);
            return done(error);
        }
    }
);

export default LocalStrategy;
