import crud from '../lib/crud';
const Message = new crud('message');
interface User {
    from: string;
    to: string;
}
interface Room {
    room: string;
}
interface Data {
    [key: string]: string | number | undefined;
}
const create = async (user: User & Room, content: string, status?: string) => {
    try {
        const message = await Message.create({
            set: {
                room: user.room,
                from: user.from,
                to: user.to,
                content: content,
                status: status ? status : 'pending',
            },
        });
        return message;
    } catch (error: any) {
        throw error;
    }
};

const get = async (where: User | Room, status?: string) => {
    try {
        console.log(typeof where);
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
