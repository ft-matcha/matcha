const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();
const crypto = require('crypto');
const createUser = async (req) => {
    const { firstName, lastName, email, uid, upass } = req.body;
    console.log(req.body);
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
        where: { uid },
    });
    return User;
};

const updateUser = async (req) => {
    const { firstName, lastName, email, uid, upass } = req.body;
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

const deleteUser = async (req) => {
    const { uid } = req.body;
    const User = await prisma.user.delete({
        where: { uid },
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
