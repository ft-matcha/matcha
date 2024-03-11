import crud from '../lib/crud';
const Message = new crud('message');

const create = async (user: any, content: string, status: string) => {
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

const get = async (user: any, status?: string) => {
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

const update = async (user: any, data: any) => {
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
