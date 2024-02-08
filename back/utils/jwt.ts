const jwt = require('jsonwebtoken');
const secret = process.env.secret;
const redisClient = require('../lib/redisClient');

module.exports = {
    sign: (user: any) => {
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return jwt.sign(payload, secret, {
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '5m', // 유효기간
        });
    },
    verify: (token: any) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                status: true,
                decoded,
            };
        } catch (err: any) {
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
    refreshVerify: async (token: any, email: string) => {
        try {
            const data = await redisClient.get(email);
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

export {};
