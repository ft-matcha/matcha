"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const secret = process.env.secret;
const redisClient = require('../lib/redisClient');
module.exports = {
    sign: (user) => {
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
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                status: true,
                decoded,
            };
        }
        catch (err) {
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
    refreshVerify: (token, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield redisClient.get(email);
            if (token === data) {
                try {
                    jwt.verify(token, secret);
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }),
};
