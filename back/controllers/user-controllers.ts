import crud from '../lib/crud';
import elastic from '../lib/elastic';
import relationControllers from './relation-controllers';
const User = new crud('user');
const Profile = new crud('profile');
interface User {
    id: string;
    uid: string;
    [key: string]: string | number | boolean | object;
}

interface Where {
    [key: string]: string | number | undefined;
}
class UserControllers {
    create = async (body: User) => {
        try {
            await User.create({
                set: body,
            });
            return {
                id: body.id,
                uid: body.uid,
            };
        } catch (error: any) {
            console.error('user create failed: ' + error.stack);
            throw error;
        }
    };

    get = async (where: Where) => {
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

    update = async (id: string, set: any) => {
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

    delete = async (id: string) => {
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
        const { phone, preferences, biography, tag, age, image, address, gender } = body;
        try {
            const profile = await Profile.create({
                set: {
                    address,
                    gender,
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
