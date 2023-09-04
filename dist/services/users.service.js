"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const create = async ({ email, lastname, name, password, username, }) => {
    // Create User in DB with ORM Prisma
    const user = await config_1.prisma.user.create({
        data: {
            email: email.toLowerCase().trim(),
            lastname,
            name,
            password,
            username: username.toLowerCase().trim(),
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
    const user = await config_1.prisma.user.findUnique({
        where: { id, status },
        select: {
            id: true,
            name: true,
            lastname: true,
            username: true,
            email: true,
        },
    });
    return user;
};
const getUserByField = async (field, value) => {
    //Get the user by field and his value in DB with ORM Prisma
    const user = await config_1.prisma.user.findUnique({
        // @ts-ignore
        where: { [field]: value },
    });
    return user;
};
const getUserByEmailOrUsername = async ({ email, username, }) => {
    // Get the user by email or username in DB with ORM Prisma
    const user = await config_1.prisma.user.findFirst({
        where: {
            OR: [
                email ? { email: email.toLowerCase?.() } : {},
                username ? { username: username.toLowerCase?.() } : {},
            ],
        },
    });
    return user;
};
// Not pagination yet and not filtering
const getAllUsers = async () => {
    const users = await config_1.prisma.user.findMany({
        where: { status: 1 },
        select: {
            id: true,
            name: true,
            lastname: true,
            username: true,
            email: true,
        },
    });
    return users;
};
const getAllUsersWithFilter = async (filter, status = 1) => {
    //Get all users with filter in DB with ORM Prisma , filter by name, lastname, username and email and sorted by username
    const users = await config_1.prisma.user.findMany({
        where: {
            status,
            OR: [
                { name: { contains: filter } },
                { lastname: { contains: filter } },
                { username: { contains: filter } },
                { email: { contains: filter } },
            ],
        },
        select: {
            id: true,
            name: true,
            lastname: true,
            username: true,
            email: true,
        },
        //Sort by username
        orderBy: { username: "asc" },
    });
    return users;
};
const getAllMenusByUserId = async (id, filter, status = 1) => {
    //Get all menus by user id in DB with ORM Prisma
    const menus = await config_1.prisma.user
        .findUnique({
        where: { id, status },
        select: { menusToUser: { select: { menu: true } } },
    })
        .then(user => user?.menusToUser.map(menu => menu.menu));
    if (!menus)
        throw new Error("Menus not found");
    const filteredMenus = filter
        ? menus.filter(menu => menu.name.includes(filter))
        : menus;
    //Get all menus with the ids of the menusToUser
    return filteredMenus;
};
const associateMenusToUser = async (id, newMenuIds, status = 1) => {
    // First, get all menus currently associated with the user
    const currentMenus = await config_1.prisma.user
        .findUnique({
        where: { id },
        select: { menusToUser: { select: { menuId: true } } },
    })
        .then(user => user?.menusToUser.map(menu => menu.menuId));
    if (!currentMenus)
        throw new Error("User not found");
    // Calculate the menus you need to add and remove
    const menusToAdd = newMenuIds.filter(menu => !currentMenus.includes(menu));
    const menusToRemove = currentMenus.filter(menu => !newMenuIds.includes(menu));
    // Prepare delete and create operations
    const deleteOperations = config_1.prisma.menusToUser.deleteMany({
        where: {
            AND: [
                { userId: id },
                {
                    menuId: {
                        in: menusToRemove,
                    },
                },
            ],
        },
    });
    const createOperations = config_1.prisma.menusToUser.createMany({
        data: menusToAdd.map(menuId => ({
            menuId,
            userId: id,
        })),
    });
    // Perform the operations in an atomic transaction
    await config_1.prisma.$transaction([deleteOperations, createOperations]);
    // You can return some information if you need to
    return { added: menusToAdd, removed: menusToRemove };
};
//Singleton pattern to export the service object
const UsersService = Object.freeze({
    create,
    delete: delete_,
    update,
    get,
    getUserByField,
    getUserByEmailOrUsername,
    getAllUsers,
    getAllMenusByUserId,
    associateMenusToUser,
    getAllUsersWithFilter,
});
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map