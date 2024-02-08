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
const express = require('express');
const jwt = require('../utils/jwt');
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const response = jwt.verify(token);
        console.log(response);
        if (response.status === false) {
            res.status(401).json(response);
        }
        else {
            req.email = response.decoded.email;
            next();
        }
    }
});
const refreshJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    if (req.headers.refreshToken) {
        const response = jwt.refreshVerify(req.headers.refreshToken, req.email);
        if (response === false) {
            res.status(401).json({ success: false, message: 'Invalid Token' });
        }
        else {
            res.status(201).json({ success: true, accessToken: jwt.sign(req.email) });
        }
    }
    res.status(401).json({ success: false, message: 'token does not exist' });
});
exports.verifyJWT = verifyJWT;
exports.refreshJWT = refreshJWT;
