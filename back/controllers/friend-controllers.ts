import curd from '../lib/crud';
import userControllers from './user-controllers';
const Friend = new curd('relation');

const requestFriend = async (fromId: number, toId: number) => {
    try {
        const friend = await Friend.create({
            fromId,
            toId,
            status: false,
        });
        return true;
    } catch (error: any) {
        throw error;
    }
};

const acceptFriend = async (fromId: number, toId: number) => {
    try {
        await Friend.update({
            where: { fromId, toId },
            data: { status: true },
        });
        return true;
    } catch (error: any) {
        throw error;
    }
};

const getFriend = async (userId: number) => {
    const friend = await Friend.read({
        where: [
            { fromId: userId, status: true },
            { toId: userId, status: true },
        ],
    });
    const data = friend.map((item: any) => {
        if (item.fromId === userId) {
            return item.toId;
        } else {
            return item.fromId;
        }
    });
    const userData = await userControllers.getUserMany(data);
    return data;
};

export default { requestFriend, acceptFriend, getFriend };
