import crud from '../lib/crud';
const Message = new crud('message');
interface User {
    fromId?: string;
    toId: string;
    roomId?: string;
    [key: string]: string | undefined;
}

interface Data {
    [key: string]: string | undefined;
}

const create = async (user: User, content: string, status?: string) => {
    try {
        const message = await Message.create({
            set: {
                roomId: user.roomId,
                fromId: user.fromId,
                toId: user.toId,
                content: content,
                status: status ? status : 'pending',
            },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const get = async (roomId: number) => {
    try {
        const message = await Message.read({
            where: { roomId: roomId },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const update = async (where: any, data: Data) => {
    try {
        const message = await Message.update({
            where: where,
            set: data,
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

export default { create, get, update };
