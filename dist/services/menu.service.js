"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListMenusByIds = exports.getMenuByName = void 0;
const buildMenuTree_1 = require("../utils/buildMenuTree");
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
    //Get the menu by id in database with ORM Prisma with its parent
    const menu = await config_1.prisma.menu.findUnique({
        where: { id, status },
        select: {
            name: true,
            id: true,
            parent: true,
            parentId: true,
            children: true,
        },
    });
    return menu;
};
const getAll = async (status = 1) => {
    const menus = await config_1.prisma.menu.findMany({
        where: { status },
        select: {
            name: true,
            id: true,
            parent: true,
            parentId: true,
            status: true,
        },
        orderBy: { parentId: "asc" },
    });
    return (0, buildMenuTree_1.buildMenuTree)(menus, null);
};
const getAllWithFilter = async (filter, status = 1) => {
    //Get all menus with filter in the name with ORM Prisma and sort by parent null first
    const menus = await config_1.prisma.menu.findMany({
        where: { name: { contains: filter }, status },
        orderBy: { parentId: "asc" },
    });
    return menus;
};
const getMenuByName = async (name) => {
    const menu = await config_1.prisma.menu.findUnique({ where: { name } });
    return menu;
};
exports.getMenuByName = getMenuByName;
//GetListMenusByIds in prisma
const getListMenusByIds = async (ids) => {
    const menus = await config_1.prisma.menu.findMany({
        where: { id: { in: ids }, status: 1, parentId: null },
    });
    return menus;
};
exports.getListMenusByIds = getListMenusByIds;
//Singleton pattern
const MenuService = Object.freeze({
    create,
    delete: delete_,
    update,
    get,
    getAll,
    getAllWithFilter,
    getMenuByName: exports.getMenuByName,
    getListMenusByIds: exports.getListMenusByIds,
});
exports.default = MenuService;
//# sourceMappingURL=menu.service.js.map