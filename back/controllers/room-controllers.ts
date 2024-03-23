import { randomUUID } from 'crypto';
import crud from '../lib/crud';
const Room = new crud('room');
const create = async (fromId: string, toId: string) => {
    try {
        const id = randomUUID();
        const room = await Room.create({
            set: {
                roomId: id,
                from: fromId,
                to: toId,
            },
        });
        return room;
    } catch (error: any) {
        throw error;
    }
};

const get = async (fromId: string, toId?: string) => {
    try {
        if (toId === undefined) {
            const room = await Room.read({
                where: {
                    OR: [{ fromId: fromId }, { toId: fromId }],
                },
            });
            return room;
        } else {
            const room = await Room.readOne({
                where: {
                    OR: [
                        { fromId: fromId, toId: toId },
                        { fromId: toId, toId: fromId },
                    ],
                },
            });
            return room;
        }
    } catch (error: any) {
        throw error;
    }
};

const getWithMessage = async (user: string) => {
    try {
        const room = await Room.read({
            innerJoinSelect: {
                table: 'message',
                fields: ['room', 'Max(messageId) AS messageId'],
                on: {
                    'room.roomId': 'a0.roomId',
                },
            },
            join: [
                {
                    table: 'message',
                    on: {
                        'a0.messageId': 'a1.messageId',
                    },
                },
            ],
            where: {
                OR: [{ 'room.fromId': user }, { 'room.toId': user }],
            },
        });
        return room;
    } catch (error: any) {
        throw error;
    }
};

export default { create, get, getWithMessage };
