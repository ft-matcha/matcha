import { Request, Response } from 'express';
const jwt = require('../utils/jwt');

const verifyJWT = async (req: any, res: Response, next: any) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const response = jwt.verify(token);
        console.log(response);
        if (response.status === false) {
            res.status(401).json(response);
        } else {
            req.email = response.decoded.email;
            next();
        }
    }
    res.status(401).json({ success: false, message: 'token does not exist' });
};

const refreshJWT = async (req: any, res: Response) => {
    console.log(req.headers);
    if (req.headers.refreshToken) {
        const response = jwt.refreshVerify(req.headers.refreshToken, req.email);
        if (response === false) {
            res.status(401).json({ success: false, message: 'Invalid Token' });
        } else {
            res.status(201).json({ success: true, accessToken: jwt.sign(req.email) });
        }
    }
    res.status(401).json({ success: false, message: 'token does not exist' });
};

exports.verifyJWT = verifyJWT;
exports.refreshJWT = refreshJWT;
