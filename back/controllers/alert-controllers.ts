import crud from '../lib/crud';
import userControllers from './user-controllers';
const Alert = new crud('alert');

const createAlert = async (fromUser: string, toUser: number, body: any) => {
    try {
        const { type, message } = body;
        const to = await userControllers.getUser(toUser);
        const alert = await Alert.create({
            fromUser,
            toId: to.id,
            type,
            message: message,
        });
        return alert;
    } catch (error: any) {
        throw error;
    }
};

const getAlert = async (email: string, status?: string) => {
    try {
        if (!status) {
            const alert = await Alert.read({
                where: { email: email },
                include: {
                    user: true,
                },
            });
            return alert;
        } else {
            const alert = await Alert.read({ where: { email: email, 'alert.status': status } });
            return alert;
        }
    } catch (error: any) {
        throw error;
    }
};

const updateAlert = async (id: number, status: string) => {
    try {
        const alert = await Alert.update({ where: { alertId: id }, data: { status: status } });
        return alert;
    } catch (error: any) {
        throw error;
    }
};

const deleteAlert = async (id: number) => {
    try {
        const alert = await Alert.delete({ where: { alertId: id } });
        return alert;
    } catch (error: any) {
        throw error;
    }
};

export default { createAlert, getAlert, updateAlert, deleteAlert };
