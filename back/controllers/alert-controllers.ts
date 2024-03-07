import crud from '../lib/crud';
const Alert = new crud('alert');

class alertControllers {
    createAlert = async (from: string, to: string, type: string, message?: string) => {
        try {
            const alert = await Alert.create({
                selectJoin: {
                    data: {
                        type: type,
                        message: message,
                    },
                    relation: [
                        { fk: 'fromId', pk: 'id', table: 'user' },
                        { fk: 'toId', pk: 'id', table: 'user' },
                    ],
                },
                where: { 'a0.email': from, 'a1.email': to },
            });
            return alert;
        } catch (error: any) {
            throw error;
        }
    };

    getAlert = async (user: string, type: string) => {
        try {
            const alert = await Alert.read({
                join: [
                    {
                        table: 'user',
                        on: {
                            'a0.id': 'toId',
                        },
                    },
                    {
                        table: 'user',
                        on: {
                            'a1.id': 'fromId',
                        },
                    },
                ],
                select: ['a1.email'],
                where: { 'a0.email': user, type: type },
            });
            return alert;
        } catch (error: any) {
            throw error;
        }
    };

    updateAlert = async (id: number, data: any) => {
        try {
            const alert = await Alert.update({ where: { alertId: id }, set: data });
            return alert;
        } catch (error: any) {
            throw error;
        }
    };

    deleteAlert = async (id: number) => {
        try {
            const alert = await Alert.delete({ where: { alertId: id } });
            return alert;
        } catch (error: any) {
            throw error;
        }
    };
}

export default new alertControllers();
