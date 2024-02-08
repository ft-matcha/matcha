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
const profileController = require('../controllers/profile-controllers');
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield profileController.createProfile(req.body);
        res.status(201).json(response);
    }
    catch (error) {
        console.error('createProfile failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'createProfile failed : server error' } });
    }
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield profileController.updateProfile(req.body);
        res.status(201).json(response);
    }
    catch (error) {
        console.error('updateProfile failed: ' + error.stack);
        res.status(500).json({ success: false, error: { message: 'updateProfile failed : server error' } });
    }
});
exports.createProfile = createProfile;
exports.updateProfile = updateProfile;
