import register from './register';
import login from './login';
import sendEmail from './sendEmail';
import verifyEmail from './verifyEmail';
import logout from './logout';
export default {
    ...register,
    ...login,
    ...logout,
    ...sendEmail,
    ...verifyEmail,
};
