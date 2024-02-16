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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userController.login(req.body);
        if (response.success === false) {
            res.status(401).json(response);
        }
        else {
            const { password, refreshToken } = response, userWithoutPassword = __rest(response, ["password", "refreshToken"]);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: userWithoutPassword,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: { messgae: 'login failed : server error' } });
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userController.getUser(req.body.email);
        if (!user) {
            const response = yield userController.createUser(req.body);
            console.log('signUp success');
            const user = yield userController.getUser(req.body.email);
            const { password, refreshToken } = user, userWithoutPassword = __rest(user, ["password", "refreshToken"]);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(201).json({
                success: true,
                data: userWithoutPassword,
            });
        }
        else {
            console.log('User already exists');
            res.status(409).json({
                success: false,
                error: { message: 'User already exists' },
            });
        }
    }
    catch (error) {
        console.error('signUp failed: ' + error.stack);
        res.status(500).json({ succes: false, error: { message: 'signUp failed : server error' } });
    }
});
exports.login = login;
exports.signup = signup;
