import crud from '../lib/crud';
const Alert = new crud('alert');

class alertControllers {
    createAlert = async (from: string, to: string, type: string, message?: string) => {
        try {
            const alert = await Alert.create({
                set: {
                    fromId: from,
                    toId: to,
                    type: type,
                    message: message ? message : null,
                },
            });
            return alert;
        } catch (error: any) {
            throw error;
        }
    };

    getAlert = async (user: string, type: string) => {
        try {
            const alert = await Alert.read({
                where: { toId: user, type: type },
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
