import userControllers from '../controllers/user-controllers';
import jwt from '../utils/jwt';

const verifyJWT = async (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const response = jwt.verify(token);
            if (response.status === false) {
                const decode = jwt.decode(token);
                // if (decode['exp'] < Date.now() / 1000) {
                //     const result = await userControllers
                //     if (result === undefined) {
                //         res.status(401).json({ success: false, message: 'Invalid Token' });
                //         return;
                //     }
                // }
                res.status(401).json({ success: false, error: { message: 'Expired Token' } });
                return;
            } else if (typeof response.decoded === 'object') {
                if (response.decoded['id'] === undefined) {
                    res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
                } else {
                    req.id = response.decoded['id'];
                    next();
                    return;
                }
            }
            res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
        } else {
            res.status(401).json({ success: false, error: { message: 'token does not exist' } }); //redirect login page
        }
    } catch (error: any) {
        console.error('verifyJWT failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'verifyJWT failed : server error' } });
    }
};

const refreshJWT = async (req: any, res: any) => {
    try {
        if (req.headers['authorization'] && req.headers['refresh']) {
            const accessToken = req.headers.authorization.split('Bearer ')[1];
            const refreshToken = req.headers.refresh.split('refresh ')[1];
            const response = await jwt.refreshVerify(accessToken, refreshToken);
            if (response.success === false) {
                res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
            } else {
                res.status(201).json({ success: true, accessToken: jwt.sign(response.id) });
            }
        } else {
            res.status(401).json({ success: false, error: { message: 'Token does not exist' } });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: { message: 'server error' } });
    }
};

export default { verifyJWT, refreshJWT };
