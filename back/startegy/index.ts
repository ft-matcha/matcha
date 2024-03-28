import { PassportStatic } from 'passport';
import GoogleStrategy from './google';
import LocalStrategy from './local';

const initStartegy = (passport: PassportStatic) => {
    passport.use('local', LocalStrategy);
    passport.use('google', GoogleStrategy);
};
export default initStartegy;
