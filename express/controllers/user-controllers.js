const PrismaClient = require('@prisma/client').PrismaClient;
const profileController = require('./profile-controllers');

const prisma = new PrismaClient();
const crypto = require('crypto');
const createUser = async (body) => {
    const { firstName, lastName, email, uid, upass } = body;
    const password = crypto.createHash('sha256', process.env.secret).update(upass).digest('hex');
    const User = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            uid,
            upass: password,
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

const bodyCheck = (body, before) => {
    const password = crypto.createHash('sha256', process.env.secret).update(body.upass).digest('hex');
    if (
        body.firstName === before.firstName &&
        body.lastName === before.lastName &&
        body.email === before.email &&
        password === before.upass
    ) {
        return true;
    }
    return false;
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.bodyCheck = bodyCheck;
exports.updateProfile = updateProfile;
