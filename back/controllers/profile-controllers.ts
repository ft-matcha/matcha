const userController = require('./user-controllers');
const crud = require('../lib/crud');
const Profile = new crud('profile');

const createProfile = async (body: any) => {
    const { gender, preferences, biography, tag, age, image, region } = body;
    try {
        const email = 'srdn45@gmail.com';
        const userData = await userController.getUser(email);
        const profile = await Profile.create({
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
    } catch (error: any) {
        throw error;
    }
};

const getProfile = async (email: string) => {
    const user = await userController.getUser(email);
    if (!user) return undefined;
    return user.profile;
};

const updateProfile = async (body: any) => {
    const { gender, preferences, biography, content, tag, age, image, email } = body;
    const userData = await userController.getUser(email);
    const profile = await Profile.update({
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
};

const deleteProfile = async (userId: string) => {
    const userData = await userController.getUser(userId);
    const profile = await Profile.delete({
        where: { userId: userData.id },
    });
    return profile;
};

exports.createProfile = createProfile;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
