// import alertControllers from '../controllers/alert-controllers';
const getAlert = async (req: any, res: any) => {
    try {
        // const response = await alertControllers.getAlert(req.email, req.query.status);
        // res.status(200).json({ success: true, data: response });
    } catch (error: any) {
        console.error('getAlert failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'getAlert failed : server error' } });
    }
};

const clickAlert = async (req: any, res: any) => {
    try {
        // const response = await alertControllers.updateAlert(req.query.id, 'CLICK');
        // res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('updateAlert failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'updateAlert failed : server error' } });
    }
};

const deleteAlert = async (req: any, res: any) => {
    try {
        // const response = await alertControllers.deleteAlert(req.query.id);
        // res.status(201).json({ success: true, data: response });
    } catch (error: any) {
        console.error('deleteAlert failed: ' + error.stack);
        res.status(200).json({ success: false, error: { status: 500, message: 'deleteAlert failed : server error' } });
    }
};

export default { getAlert, clickAlert, deleteAlert };
