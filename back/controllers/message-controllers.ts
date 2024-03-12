import crud from '../lib/crud';
const Message = new crud('message');
interface User {
    from: string;
    to: string;
}
interface Data {
    [key: string]: string | number | undefined;
}
const create = async (user: User, content: string, status: string) => {
    try {
        const message = await Message.create({
            set: {
                fromId: user.from,
                toId: user.to,
                content: content,
                status: status,
            },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const get = async (user: User, status?: string) => {
    try {
        const where = {
            OR: [
                { fromId: user.from, toId: user.to },
                { fromId: user.to, toId: user.from },
            ],
        };
        if (status) {
            where.OR.map((item: any) => (item['status'] = status));
        }
        const message = await Message.read({
            where: where,
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const update = async (user: User, data: Data) => {
    try {
        const message = await Message.update({
            where: { fromId: user.from, toId: user.to },
            set: data,
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

export default { create, get, update };
