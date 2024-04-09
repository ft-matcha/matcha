import { Strategy } from 'passport-google-oauth20';
import userControllers from '../controllers/user-controllers';
import crypto, { randomUUID } from 'crypto';
import mailer from '../lib/mailer';
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (clientID === undefined || clientSecret === undefined) {
    throw new Error('Google OAuth2.0 clientID or clientSecret not found');
}

const GoogleStrategy = new Strategy(
    {
        clientID,
        clientSecret,
        callbackURL: 'https://localhost:8000/api/v1/oauth',
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
            console.log(profile);
            const user = await userControllers.get({ uid: profile.id });
            const randomPassword = crypto.randomBytes(20).toString('hex');
            if (process.env.secret === undefined) {
                return done(new Error('secret not found'));
            }
            const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(randomPassword).digest('hex');
            if (user === undefined) {
                const id = randomUUID();
                await userControllers.create({
                    id: id,
                    uid: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: cryptoPass,
                });
                await mailer.sendEmail(profile.emails[0].value);
                done(null, {
                    id: id,
                });
            } else {
                done(null, user);
            }
        } catch (error: any) {
            done(error);
        }
    }
);

export default GoogleStrategy;
