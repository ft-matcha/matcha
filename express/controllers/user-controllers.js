const PrismaClient = require('@prisma/client').PrismaClient;
const jwt = require('../utils/jwt');
const profileController = require('./profile-controllers');

const prisma = new PrismaClient();
const crypto = require('crypto');
const createUser = async (body) => {
    const { firstName, lastName, email, id, password } = body;
    const pass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
    const User = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            uid: id,
            upass: pass,
        },
    });
    return User;
};

const getUser = async (uid) => {
    if (!uid) return undefined;
    const User = await prisma.user.findUnique({
        where: { uid: uid },
        include: { profile: true },
    });
    return User;
};

const updateUser = async (body) => {
    const { firstName, lastName, email, uid, upass } = body;
    const password = crypto.createHash('sha256', process.env.secret).update(upass).digest('hex');
    const User = await prisma.user.update({
        where: { uid },
        data: {
            email,
            firstName,
            lastName,
            upass: password,
        },
    });
    return User;
};

updateRefresh = async (userId, refresh) => {
    await prisma.user.update({
        where: { uid: userId },
        data: {
            refresh,
        },
    });
};

const updateProfile = async (profile) => {
    await prisma.user.update({
        where: { id: profile.userId },
        data: {
            profile: {
                connect: {
                    id: profile.id,
                },
            },
        },
    });
};

const deleteUser = async (data) => {
    if (data.profile.length !== 0) {
        await profileController.deleteProfile(data.uid);
    }
    const User = await prisma.user.delete({
        where: { uid: data.uid },
    });
    return User;
};

const checkPassword = async (body) => {
    const { id, password } = body;
    const cryptoPass = crypto.createHash('sha256', process.env.secret).update(password).digest('hex');
    const user = await getUser(id);
    if (!user) {
        console.log('User not found');
        return {
            success: false,
            error: { message: 'User not found' },
        };
    } else if (user.upass === cryptoPass) {
        console.log('Login success');
        const accessToken = jwt.sign(user);
        const refreshToken = jwt.refresh();
        await updateRefresh(id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    } else {
        console.log('Incorrect password');
        return {
            success: false,
            error: { message: 'Incorrect password' },
        };
    }
};

const getRefresh = async (userId) => {
    const data = await prisma.user.findUnique({
        where: { uid: userId },
    });
    if (!data) {
        console.log('User not found');
        return undefined;
    }
    return data.refresh;
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.checkPassword = checkPassword;
exports.updateProfile = updateProfile;
exports.getRefresh = getRefresh;
