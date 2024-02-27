import crud from '../lib/crud';
import userControllers from './user-controllers';
const Profile = new crud('profile');

const createProfile = async (userId: number, body: any) => {
    const { gender, preferences, biography, tag, age, image } = body;
    try {
        const profile = await Profile.create({
            gender,
            preferences,
            biography,
            tag,
            age,
            image,
            viewList: [],
            userId: userId,
        });

        return profile;
    } catch (error: any) {
        throw error;
    }
};

const getProfile = async (email: string) => {
    const profile = await Profile.readOne({
        where: { email: email },
        include: { user: true },
    });
    return profile;
};

const deleteProfile = async (userId: string) => {
    const userData = await userControllers.getUser(userId);
    const profile = await Profile.delete({
        where: { userId: userData.id },
    });
    return profile;
};

export default { createProfile, getProfile, deleteProfile };
