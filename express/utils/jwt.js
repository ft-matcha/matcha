const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

module.exports = {
    sign: (user) => {
        const payload = {
            id: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return jwt.sign(payload, secret, {
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '5m', // 유효기간
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                status: true,
                decoded,
            };
        } catch (err) {
            return {
                status: false,
                message: err.message,
            };
        }
    },
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn: '14d',
        });
    },
    refreshVerify: async (token, userId) => {
        try {
            const data = await userController.getRefresh(userId);
            if (token === data) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
};
