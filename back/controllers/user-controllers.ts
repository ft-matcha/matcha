import crud from '../lib/crud';
import jwt from '../utils/jwt';
import redis from '../lib/redisClient';
import elastic from '../lib/elastic';
import profileController from './profile-controllers';
import crypto from 'crypto';
const User = new crud('user');

const createUser = async (body: any) => {
    try {
        const { firstName, lastName, email, password, phone, address } = body;
        if (!process.env.secret) throw new Error('secret not found');
        const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(password).digest('hex');
        await User.create({
            email,
            firstName,
            lastName,
            password: cryptoPass,
            phone,
            address,
        });
        const accessToken = await jwt.sign(email);
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

const getUser = async (email: string | number, profile?: boolean) => {
    try {
        const user = await User.readOne({
            where: { email },
            include: profile ? { profile: true } : undefined,
        });
        return user;
    } catch (error: any) {
        throw error;
    }
};

const getUserMany = async (id: number[]) => {
    try {
        const users = await User.read(id);
        return users;
    } catch (error: any) {
        throw error;
    }
};

const updateUser = async (email: string, body: any) => {
    try {
        const userData = await getUser(email);
        if (body.password) {
            if (!process.env.secret) throw new Error('secret not found');
            const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(body.password).digest('hex');
            body.password = cryptoPass;
        }
        Object.keys(body).forEach((key) => {
            console.log(body[key] === userData[key], typeof body[key], typeof userData[key]);
            if (body[key] === undefined) delete body[key];
            if (body[key] === userData[key]) delete body[key];
        });
        const user = await User.update({
            where: { email },
            data: body,
            include: { profile: true },
        });
        return user;
    } catch (error: any) {
        throw error;
    }
};

const deleteUser = async (email: string) => {
    try {
        const data = await User.readOne(email);
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
        if (!process.env.secret) throw new Error('secret not found');
        const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(password).digest('hex');
        const user = await getUser(email);
        if (!user) {
            return {
                success: false,
                error: { message: 'User not found' },
            };
        }
        //  else if (user.status === 'ACTIVE' ) {
        //     return {
        //         success: false,
        //         error: { message: 'User already logged in' },
        //     };
        // }
        else if (user.password === cryptoPass) {
            const accessToken = jwt.sign(user.email);
            const refreshToken = await jwt.refresh();
            if (user.verified === false) {
                User.update({
                    where: { email },
                    data: { status: 'NOT_VERIFIED' },
                });
            } else {
                User.update({
                    where: { email },
                    data: { status: 'ACTIVE' },
                });
            }
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

const logout = async (email: string) => {
    try {
        const user = await getUser(email);
        if (user.status === 'ACTIVE' || user.status === 'NOT_VERIFIED') {
            await redis.del(email);
            await User.update({
                where: { email },
                data: { status: 'INACTIVE' },
            });
            await elastic.update(email, { status: 'INACTIVE' });
            return { success: true };
        } else {
            return { success: false, error: { message: 'User already logged out' } };
        }
    } catch (error: any) {
        console.error('logout failed: ' + error.stack);
        throw error;
    }
};

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    logout,
    getUserMany,
};
