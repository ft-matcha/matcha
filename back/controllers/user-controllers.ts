const crud = require('../lib/crud');
const User = new crud('user');
const crypto = require('crypto');
const jwt = require('../utils/jwt');
const redis = require('../lib/redisClient');
const elastic = require('../lib/elastic');
const profileController = require('./profile-controllers');

const createUser = async (body: any) => {
    try {
        const { firstName, lastName, email, password, phone, address } = body;
        const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
        const user = await User.create({
            email,
            firstName,
            lastName,
            password: cryptoPass,
            phone,
            address,
            status: 'NOT_VERIFIED',
        });
        const elasticData = await elastic.create(email, {
            email,
            firstName,
            lastName,
            phone,
            address,
        });
        const userData = await getUser(email);
        const accessToken = await jwt.sign(userData);
        const refreshToken = await jwt.refresh();
        return {
            accessToken,
            refreshToken,
        };
    } catch (error: any) {
        console.error('user create failed: ' + error.stack);
        throw error;
    }
};

const getUser = async (email: string, include?: any) => {
    try {
        const user = await User.readOne({
            where: { email },
        });
        return user;
    } catch (error: any) {
        throw error;
    }
};

const updateUser = async (body: any) => {
    const { firstName, lastName, email, password } = body;
    const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
    const user = await User.update({
        where: { email },
        data: { firstName, lastName, password: cryptoPass },
    });
    return user;
};

const deleteUser = async (email: string) => {
    try {
        const data = await User.getOne(email);
        if (data.profile.length !== 0) {
            await profileController.deleteProfile(email);
        }
        const response = await User.delete(email);
        return response;
    } catch (error: any) {
        console.error('DB delete failed: ' + error.stack);
        return error;
    }
};

const login = async (body: any) => {
    try {
        const { email, password } = body;
        const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
        const user = await getUser(email);
        if (!user) {
            console.log('User not found');
            return {
                success: false,
                error: { message: 'User not found' },
            };
        } else if (user.password === cryptoPass) {
            console.log('Login success');
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();
            await redis.set(email, refreshToken);
            return {
                accessToken,
                refreshToken,
            };
        } else {
            console.log('Incorrect password');
            return {
                success: false,
                error: { message: 'Incorrect password' },
            };
        }
    } catch (error: any) {
        throw error;
    }
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
export {};
