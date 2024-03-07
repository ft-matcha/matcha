import crud from '../lib/crud';
const Message = new crud('message');

const create = async (user: any, content: string, status: string) => {
    try {
        const message = await Message.create({
            selectJoin: {
                data: {
                    content: content,
                    status: status,
                },
                relation: [
                    { fk: 'fromId', pk: 'id', table: 'user' },
                    { fk: 'toId', pk: 'id', table: 'user' },
                ],
            },
            where: { 'a0.email': user.from, 'a1.email': user.to },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const get = async (user: any, status?: string) => {
    try {
        const where = {
            'a0.email': user.from,
            'a1.email': user.to,
            status: status,
            OR: [{ 'a0.email': user.to, 'a1.email': user.from, status: status }],
        };
        if (status) {
            where['status'] = status;
            where.OR.map((item: any) => (item['status'] = status));
        }
        const message = await Message.read({
            join: [
                {
                    table: 'user',
                    on: {
                        'a0.id': 'fromId',
                    },
                },
                {
                    table: 'user',
                    on: {
                        'a1.id': 'toId',
                    },
                },
            ],
            select: ['a0.email'],
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
            join: [
                {
                    table: 'user',
                    on: {
                        'a0.id': 'fromId',
                    },
                },
                {
                    table: 'user',
                    on: {
                        'a1.id': 'toId',
                    },
                },
            ],
            set: data,
            where: { 'a0.email': user.from, 'a1.email': user.to },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

export default { create, get, update };
