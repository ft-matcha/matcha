import curd from '../lib/crud';
import userControllers from './user-controllers';
const Friend = new curd('relation');

const createFriend = async (fromUser: string, toUser: string) => {
    try {
        const from = await userControllers.getUser(fromUser);
        const to = await userControllers.getUser(toUser);
        const friend = await Friend.create({
            fromId: from.id,
            toId: to.id,
        });
        return true;
    } catch (error: any) {
        throw error;
    }
};

const updateFriend = async (toUser: string, fromUser: string, status: string) => {
    try {
        const from = await userControllers.getUser(fromUser);
        const to = await userControllers.getUser(toUser);
        await Friend.update({
            where: { fromId: from.id, toId: to.id },
            data: { status: status },
        });
        return true;
    } catch (error: any) {
        throw error;
    }
};

const getFriend = async (email: string | any, status?: string, fromTo?: string) => {
    if (typeof email === 'string') {
        const friend = await Friend.read({
            where: { email: email, 'relation.status': status },
            include: { user: true },
        });
        const user = await userControllers.getUser(email);
        if (!fromTo) {
            const data = friend.map((item: any) => {
                if (item.fromId === user.id) {
                    return item.toId;
                } else {
                    return item.fromId;
                }
            });
            return data;
        } else {
            const data = friend.map((item: any) => {
                if (fromTo === 'from') {
                    if (item.fromId === user.id) {
                        return item.toId;
                    }
                } else {
                    if (item.toId === user.id) {
                        return item.fromId;
                    }
                }
            });
            return data;
        }
    } else {
        const from = await userControllers.getUser(email.fromUser);
        const to = await userControllers.getUser(email.toUser);
        const friend = await Friend.readOne({
            where: [
                { fromId: from.id, toId: to.id },
                { fromId: to.id, toId: from.id },
            ],
        });
        return friend;
    }
};

export default { createFriend, updateFriend, getFriend };
