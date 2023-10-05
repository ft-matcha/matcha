const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();
const crypto = require('crypto');
const createUser = async (req) => {
    const { firstName, lastName, email, uid, upass } = req.body;
    console.log(req.body);
    const password = crypto.createHmac('sha256', process.env.secret).update(upass).digest('hex');
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

const getUser = async (req) => {
    const { uid } = req.params;
    if (!uid) return undefined;
    const User = await prisma.user.findUnique({
        where: { uid },
    });
    return User;
};

const updateUser = async (req) => {
    const { firstName, lastName, email, uid, upass } = req.body;
    const User = await prisma.user.update({
        where: { uid },
        data: {
            email,
            firstName,
            lastName,
            upass,
        },
    });
    return User;
};

const deleteUser = async (req) => {
    const { uid } = req.body;
    const User = await prisma.user.delete({
        where: { uid },
    });
    return User;
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
