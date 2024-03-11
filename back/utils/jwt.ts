import jwt from 'jsonwebtoken';
import redisClient from '../lib/redisClient';
const secret = process.env.secret;
interface payload {
    email: string;
    firstName: string;
    lastName: string;
}
interface verify {
    status: boolean;
    decoded?: payload | string;
    message?: string;
}
export default {
    decode: (token: string) => {
        return jwt.decode(token);
    },
    sign: (id: string) => {
        const payload = {
            id: id,
        };
        if (!secret) throw new Error('secret not found');
        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
    },
    verify: (token: any) => {
        try {
            if (!secret) throw new Error('secret not found');
            const decoded = jwt.verify(token, secret);
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
        if (!secret) throw new Error('secret not found');
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn: '14d',
        });
    },
    refreshVerify: async (accessToken: string, refreshToken: string) => {
        try {
            const decoded = jwt.decode(accessToken);
            const data = await redisClient.get(decoded.id);
            if (refreshToken === data) {
                if (!secret) throw new Error('secret not found');
                jwt.verify(refreshToken, secret);
                return {
                    success: true,
                    id: decoded.id,
                };
            } else {
                return {
                    success: false,
                    message: 'Invalid Token',
                };
            }
        } catch (err: any) {
            return { success: false, error: { status: 500, message: err.message } };
        }
    },
};
