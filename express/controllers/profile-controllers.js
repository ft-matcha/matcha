const PrismaClient = require('@prisma/client').PrismaClient;
const userController = require('./user-controllers');

const prisma = new PrismaClient();

const createProfile = async (req) => {
    const { gender, preferences, content, bio, tag, age, image, user } = req.body;
    const userData = await userController.getUser(user);
    const profile = await prisma.profile.create({
        data: {
            gender,
            preferences,
            bio,
            content,
            tag,
            age,
            image,
            userId: userData.id,
        },
    });
    userController.updateProfile(profile);
    return profile;
};

const getProfile = async (uid) => {
    const user = await userController.getUser(uid);
    if (!user) return undefined;
    return user.profile;
};

const updateProfile = async (req) => {
    const { gender, preferences, bio, content, tag, age, image, user } = req.body;
    const userData = await userController.getUser(user);
    const profile = await prisma.profile.update({
        where: { userId: userData.id },
        data: {
            gender,
            preferences,
            bio,
            content,
            tag,
            age,
            image,
        },
    });
    return profile;
};

const deleteProfile = async (user) => {
    const userData = await userController.getUser(user);
    const profile = await prisma.profile.delete({
        where: { userId: userData.id },
    });
    return profile;
};

exports.createProfile = createProfile;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
