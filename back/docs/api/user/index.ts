import get from './get';
import update from './update';
import checkEmail from './checkEmail';
import recommend from './recommend';
export default {
    ...get,
    ...update,
    ...checkEmail,
    ...recommend,
};
