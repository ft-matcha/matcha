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
const crud = require('../lib/crud');
const User = new crud('user');
const crypto = require('crypto');
const jwt = require('../utils/jwt');
const redis = require('../lib/redisClient');
const redisClient = redis.getClient();
const profileController = require('./profile-controllers');
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = body;
        const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
        const user = yield User.create({
            email,
            firstName,
            lastName,
            password: cryptoPass,
        });
        return user;
    }
    catch (error) {
        console.error('user create failed: ' + error.stack);
        throw error;
    }
});
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.readOne(email);
        return user;
    }
    catch (error) {
        console.error('DB read failed: ' + error.stack);
        return error;
    }
});
const updateUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = body;
    const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
    const user = yield User.update({
        where: { email },
        data: { firstName, lastName, password: cryptoPass },
    });
    return user;
});
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield User.getOne(email);
        if (data.profile.length !== 0) {
            yield profileController.deleteProfile(email);
        }
        const response = yield User.delete(email);
        return response;
    }
    catch (error) {
        console.error('DB delete failed: ' + error.stack);
        return error;
    }
});
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
        const user = yield getUser(email);
        if (!user) {
            console.log('User not found');
            return {
                success: false,
                error: { message: 'User not found' },
            };
        }
        else if (user.password === cryptoPass) {
            console.log('Login success');
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();
            yield redisClient.set(email, refreshToken);
            return {
                success: true,
                accessToken,
                refreshToken,
            };
        }
        else {
            console.log('Incorrect password');
            return {
                success: false,
                error: { message: 'Incorrect password' },
            };
        }
    }
    catch (error) {
        throw error;
    }
});
const getRefresh = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await prisma.user.findUnique({
    //     where: { uid: userId },
    // });
    // if (!data) {
    //     console.log('User not found');
    //     return undefined;
    // }
    // return data.refresh;
});
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.getRefresh = getRefresh;
