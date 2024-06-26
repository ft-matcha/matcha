// import alertControllers from '../controllers/alert-controllers';
import { Request, Response } from 'express';
const getAlert = async (req: Request, res: Response) => {
    try {
        // const response = await alertControllers.getAlert(req.email, req.query.status);
        // res.status(200).json({ success: true, data: response });
    } catch (error: any) {
        console.error('getAlert failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'getAlert failed : server error' } });
    }
};

const clickAlert = async (req: Request, res: Response) => {
    try {
        // const response = await alertControllers.updateAlert(req.query.id, 'CLICK');
        // res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('updateAlert failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateAlert failed : server error' } });
    }
};

const deleteAlert = async (req: Request, res: Response) => {
    try {
        // const response = await alertControllers.deleteAlert(req.query.id);
        // res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('deleteAlert failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'deleteAlert failed : server error' } });
    }
};

export default { getAlert, clickAlert, deleteAlert };
