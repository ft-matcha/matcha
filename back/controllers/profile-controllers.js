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
const userController = require('./user-controllers');
const crud = require('../lib/crud');
const Profile = new crud('profile');
const createProfile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, preferences, biography, tag, age, image, region } = body;
    try {
        const email = 'srdn45@gmail.com';
        const userData = yield userController.getUser(email);
        const profile = yield Profile.create({
            gender,
            preferences,
            biography,
            tag: JSON.stringify(tag),
            age,
            image: JSON.stringify(image),
            viewList: JSON.stringify([]),
            userId: userData.id,
            region,
        });
        return profile;
    }
    catch (error) {
        throw error;
    }
});
const getProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userController.getUser(email);
    if (!user)
        return undefined;
    return user.profile;
});
const updateProfile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, preferences, biography, content, tag, age, image, email } = body;
    const userData = yield userController.getUser(email);
    const profile = yield Profile.update({
        where: { userId: userData.id },
        data: {
            gender,
            preferences,
            biography,
            content,
            tag,
            age,
            image,
        },
    });
    return profile;
});
const deleteProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield userController.getUser(userId);
    const profile = yield Profile.delete({
        where: { userId: userData.id },
    });
    return profile;
});
exports.createProfile = createProfile;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
