import crud from '../lib/crud';
import jwt from '../utils/jwt';
import redis from '../lib/redisClient';
import elastic from '../lib/elastic';
import crypto, { randomUUID } from 'crypto';
import relationControllers from './relation-controllers';
const User = new crud('user');
const Profile = new crud('profile');
interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: string;
    address: string;
    verified?: number;
    status?: string;
    profile?: number;
}

interface Where {
    [key: string]: string | number | undefined;
}
class UserControllers {
    createUser = async (body: User) => {
        try {
            const { uid, firstName, lastName, email, password, gender, address } = body;
            if (!process.env.secret) throw new Error('secret not found');
            const cryptoPass = crypto.createHmac('sha256', process.env.secret).update(password).digest('hex');
            const id = randomUUID();
            await User.create({
                set: {
                    id,
                    uid,
                    email,
                    firstName,
                    lastName,
                    password: cryptoPass,
                    gender,
                    address,
                },
            });
            const accessToken = await jwt.sign(id);
            const refreshToken = await jwt.refresh();
            return {
                id,
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            console.error('user create failed: ' + error.stack);
            throw error;
        }
    };

    getUser = async (where: Where) => {
        try {
            const user = await User.readOne({
                where: where,
                include: { table: 'profile', fk: 'userId', pk: 'id' },
            });
            return user;
        } catch (error: any) {
            throw error;
        }
    };

    updateUser = async (id: string, set: any) => {
        try {
            Object.keys(set).forEach((key) => {
                if (set[key] === undefined) delete set[key];
            });
            const response = await User.update({
                where: { id: id },
                set: set,
                include: { table: 'profile', fk: 'userId', pk: 'id' },
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    deleteUser = async (id: string) => {
        try {
            const response = await User.delete(id);
            return response;
        } catch (error: any) {
            console.error('DB delete failed: ' + error.stack);
            return error;
        }
    };

    getRecommend = async (user: any, tag?: string) => {
        try {
            const should: any = [{ terms: { gender: user.preferences } }];
            if (tag) {
                should.push({ terms: { tag: tag } });
            }
            const bool: any = {};
            const relation = await relationControllers.getRelation({ from: user.id }, 'HATE');
            if (relation.length > 0) {
                const notUser = relation.map((item: any) => {
                    return item.email;
                });
                bool['must_not'] = {
                    terms: {
                        email: notUser,
                    },
                };
            }
            bool.should = should;
            const recommend = await elastic.search({ bool: bool });
            return recommend;
        } catch (error: any) {
            throw error;
        }
    };

    createProfile = async (id?: string, body?: any) => {
        const { phone, preferences, biography, tag, age, image } = body;
        try {
            const profile = await Profile.create({
                set: {
                    phone,
                    preferences,
                    biography,
                    tag,
                    age,
                    image,
                    userId: id,
                },
            });
            return profile;
        } catch (error: any) {
            throw error;
        }
    };
}

export default new UserControllers();
