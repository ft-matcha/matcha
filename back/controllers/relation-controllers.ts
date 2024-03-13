import curd from '../lib/crud';
const Relation = new curd('relation');
class relationControllers {
    createRelation = async (from: string, to: string, status: string) => {
        try {
            const relation = await Relation.create({
                set: {
                    fromId: from,
                    toId: to,
                    status: status,
                },
            });
            return relation;
        } catch (error: any) {
            throw error;
        }
    };

    updateRelation = async (
        data: {
            relationId?: number;
            from?: string;
            to?: string;
        },
        status: string
    ) => {
        try {
            if (typeof data.relationId === 'number') {
                const relation = await Relation.update({
                    where: { relationId: data.relationId },
                    set: { status: status },
                });
                return relation;
            } else {
                const relation = await Relation.update({
                    where: { fromId: data.from, toId: data.to },
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
                                table: 'relation',
                                on: {
                                    'a0.toId': 'fromId',
                                    'a0.fromId': 'toId',
                                    'a0.status': 'status',
                                },
                            },
                            {
                                table: 'user',
                                on: {
                                    'a1.id': 'toId',
                                },
                            },
                        ],
                        select: ['a1.*'],
                        where: {
                            fromId: user.from,
                            status: status,
                        },
                    });
                    return relation;
                } else {
                    const relation = await Relation.read({
                        join: [
                            {
                                table: 'user',
                                on: {
                                    'a0.id': 'toId',
                                },
                            },
                        ],
                        select: ['a0.*'],
                        where: {
                            fromId: user.from,
                            status: status,
                        },
                    });
                    return relation;
                }
            } else {
                const relation = await Relation.readOne({
                    where: {
                        fromId: user.from,
                        toId: user.to,
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
