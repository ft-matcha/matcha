import user from './user';
import userParams from './userParams';
import checkEmail from './checkEmail';
import recommend from './recommend';
export default {
    ...user,
    ...userParams,
    ...checkEmail,
    ...recommend,
};
