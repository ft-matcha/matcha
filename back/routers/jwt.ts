import { RequestHandler, Request, Response, NextFunction } from 'express';
import userControllers from '../controllers/user-controllers';
import jwt from '../utils/jwt';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req, res, next);
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            const response = jwt.verify(token);
            console.log(`response: `, response);
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
                }
            }
        } else {
            res.status(401).json({ success: false, error: { message: 'token does not exist' } }); //redirect login page
        }
    } catch (error: any) {
        console.error('verifyJWT failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'verifyJWT failed : server error' } });
    }
};

const refreshJWT = async (req: Request, res: Response) => {
    try {
        if (req.headers['authorization'] && req.headers['refresh']) {
            const accessToken = req.headers.authorization.split('Bearer ')[1];
            const refreshToken =
                typeof req.headers.refresh === 'string' ? req.headers.refresh.split('refresh ')[1] : null;
            if (refreshToken === null) {
                res.status(401).json({ success: false, error: { message: 'Invalid Token' } });
                return;
            }
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
