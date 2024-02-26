import userControllers from '../controllers/user-controllers';
import jwt from '../utils/jwt';

const verifyJWT = async (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const response = jwt.verify(token);
            if (response.status === false) {
                const decode = jwt.decode(token);
                console.log(decode);
                if (decode['exp'] < Date.now() / 1000) {
                    await userControllers.updateUser(decode['email'], { status: 'INACTIVE' });
                }
                res.status(401).json({ success: false, message: 'Expired Token' });
                return;
            } else if (typeof response.decoded === 'object') {
                if (response.decoded['email'] === undefined) {
                    res.status(401).json({ success: false, message: 'Invalid Token' });
                } else {
                    req.email = response.decoded['email'];
                    next();
                    return;
                }
            }
            res.status(401).json({ success: false, message: 'Invalid Token' });
        } else {
            res.status(401).json({ success: false, message: 'token does not exist' });
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
                res.status(401).json({ success: false, message: 'Invalid Token' });
            } else {
                res.status(201).json({ success: true, accessToken: jwt.sign(response.email) });
            }
        } else {
            res.status(401).json({ success: false, message: 'Token does not exist' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, error: error });
    }
};

export default { verifyJWT, refreshJWT };