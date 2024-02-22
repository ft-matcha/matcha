import signup from './signup';
import login from './login';
import sendEmail from './sendEmail';
import verifyEmail from './verifyEmail';
import logout from './logout';
export default {
    ...signup,
    ...login,
    ...logout,
    ...sendEmail,
    ...verifyEmail,
};
