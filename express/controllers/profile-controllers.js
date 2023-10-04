const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();

const createProfile = async (req) => {
    const { gender, preferences, bio, tag, age, image, user } = req.body;
    const profile = await prisma.profile.create({
        data: {
            gender,
            preferences,
            bio,
            tag,
            age,
            image,
            user,
        },
    });
    return profile;
};

const getProfile = async (req) => {
    const { user } = req.body;
    const profile = await prisma.profile.findUnique({
        where: { user },
    });
    return profile;
};

exports.createProfile = createProfile;
