import get from './get';
import update from './update';
import checkEmail from './checkEmail';
export default {
    ...get,
    ...update,
    ...checkEmail,
};
