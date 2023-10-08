// jwt-util.js
const jwt = require('jsonwebtoken');
const secret = 'asdsadafdfsdgsfgggsag';

module.exports = {
    sign: (user) => {
        const payload = {
            id: user.id,
            pass: user.pass,
        };

        return jwt.sign(payload, secret, {
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '1h', // 유효기간
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                status: true,
                id: decoded.id,
                pass: decoded.pass,
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
        const getAsync = token.cookie('refresh', token);

        try {
            const data = await getAsync(userId); // refresh token 가져오기
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
