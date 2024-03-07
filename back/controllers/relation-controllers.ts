import curd from '../lib/crud';
import userControllers from './user-controllers';
const Relation = new curd('relation');
class relationControllers {
    createRelation = async (from: string, to: string, status: string) => {
        try {
            const relation = await Relation.create({
                selectJoin: {
                    data: {
                        status: status,
                    },
                    relation: [
                        { fk: 'fromId', pk: 'id', table: 'user' },
                        { fk: 'toId', pk: 'id', table: 'user' },
                    ],
                },
                where: { 'a0.email': from, 'a1.email': to },
            });
            return relation;
        } catch (error: any) {
            throw error;
        }
    };

    updateRelation = async (data: any, status: string) => {
        try {
            if (typeof data.relationId === 'object') {
                const relation = await Relation.update({
                    where: { relationId: data.relationId },
                    set: { status: status },
                });
                return relation;
            } else {
                const relation = await Relation.update({
                    where: { relationId: data },
                    set: { status: status },
                });
                return relation;
            }
        } catch (error: any) {
            throw error;
        }
    };

    getRelation = async (user: any, status?: string) => {
        try {
            if (user.to === undefined) {
                if (user.duplex === true) {
                    const relation = await Relation.read({
                        join: [
                            {
                                table: 'user',
                                on: {
                                    'a0.id': 'fromId',
                                },
                            },
                            {
                                table: 'relation',
                                on: {
                                    'a1.toId': 'fromId',
                                    'a1.fromId': 'toId',
                                    'a1.status': 'status',
                                },
                            },
                            {
                                table: 'user',
                                on: {
                                    'a2.id': 'toId',
                                },
                            },
                        ],
                        where: {
                            'a0.email': user.from,
                            'relation.status': status,
                        },
                        select: ['a2.email'],
                    });
                    return relation;
                } else {
                    const relation = await Relation.read({
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
                        select: ['a1.email'],
                        where: {
                            'a0.email': user.from,
                        },
                    });
                    return relation;
                }
            } else {
                const relation = await Relation.readOne({
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
                    where: {
                        'a0.email': user.from,
                        'a1.email': user.to,
                    },
                });
                return relation;
            }
        } catch (error: any) {
            throw error;
        }
    };
}

export default new relationControllers();
