"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const create = async ({ email, lastname, name, password, username, }) => {
    // Create User in DB with ORM Prisma
    const user = await config_1.prisma.user.create({
        data: {
            email: email.toLowerCase(),
            lastname,
            name,
            password,
            username,
            status: 1,
        },
    });
    return user;
};
const delete_ = async (id) => {
    // Making an logic delete of a user in DB with ORM Prisma
    const user = await config_1.prisma.user.update({
        where: { id, status: 1 },
        data: { status: 0 },
    });
    return user;
};
const update = async (id, payload) => {
    const user = await config_1.prisma.user.update({
        where: { id },
        data: payload,
    });
    return user;
};
const get = async (id, status = 1) => {
    //Get the user by id in DB with ORM Prisma
    const user = await config_1.prisma.user.findUnique({ where: { id, status } });
    return user;
};
const getUserByField = async (field, value, status = 1) => {
    //Get the user by field and his value in DB with ORM Prisma
    const user = await config_1.prisma.user.findUnique({
        // @ts-ignore
        where: { [field]: value, status },
    });
    return user;
};
// Not pagination yet and not filtering
const getAllUsers = async () => {
    const users = await config_1.prisma.user.findMany({
        where: { status: 1 },
    });
    return users;
};
//Singleton pattern to export the service object
const UsersService = Object.freeze({
    create,
    delete: delete_,
    update,
    get,
    getUserByField,
    getAllUsers,
});
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map