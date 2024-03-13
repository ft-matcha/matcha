import { randomUUID } from 'crypto';
import crud from '../lib/crud';
const Room = new crud('room');
const create = async (from: string, to: string) => {
    try {
        const id = randomUUID();
        const room = await Room.create({
            set: {
                id: id,
                from: from,
                to: to,
            },
        });
        return room;
    } catch (error: any) {
        throw error;
    }
};

const get = async (from: string, to: string) => {
    try {
        const room = await Room.read({
            where: {
                OR: [
                    { from: from, to: to },
                    { from: to, to: from },
                ],
            },
        });
        return room ? room[0] : room;
    } catch (error: any) {
        throw error;
    }
};

export default { create, get };
