const e = require('express');
const jwt = require('../utils/jwt');

const verifyJWT = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const response = jwt.verify(token);
        console.log(response);
        if (response.status === false) {
            res.status(401).json(response);
        } else {
            req.id = response.decoded.id;
            req.email = response.decoded.email;
            next();
        }
    }
};

const refreshJWT = async (req, res) => {
    console.log(req.headers);
    if (req.headers.refreshToken) {
        const response = jwt.refreshVerify(req.headers.refreshToken, req.id);
        if (response === false) {
            res.status(401).json({ success: false, message: 'Invalid Token' });
        } else {
            res.statue(201).json({ success: true, accessToken: jwt.sign(req.id) });
        }
    }
    res.status(401).json({ success: false, message: 'token does not exist' });
};

exports.verifyJWT = verifyJWT;
exports.refreshJWT = refreshJWT;
