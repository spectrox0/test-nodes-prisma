"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const create = async (payload) => {
    //Create Menu in database with Prisma ORM
    const menu = await config_1.prisma.menu.create({
        data: Object.assign(payload, { status: 1 }),
    });
    return menu;
};
const delete_ = async (id) => {
    const menu = await config_1.prisma.menu.update({
        where: { id },
        data: { status: 0 },
    });
    return menu;
};
const update = async (id, payload) => {
    const menu = await config_1.prisma.menu.update({
        where: { id },
        data: payload,
    });
    return menu;
};
const get = async (id, status = 1) => {
    const menu = await config_1.prisma.menu.findUnique({ where: { id, status } });
    return menu;
};
const getAll = async () => {
    const menus = await config_1.prisma.menu.findMany({ where: { status: 1 } });
    return menus;
};
//Singleton pattern
const MenuService = Object.freeze({
    create,
    delete: delete_,
    update,
    get,
    getAll,
});
exports.default = MenuService;
//# sourceMappingURL=menu.service.js.map