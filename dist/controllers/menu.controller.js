"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_service_1 = __importDefault(require("../services/menu.service"));
const zod_1 = __importDefault(require("zod"));
const getMenu = async (req, res) => {
    const { id } = req;
    //get menu from database
    try {
        const menu = await menu_service_1.default.get(id);
        if (!menu)
            return res.status(404).send({
                message: "Menu not found",
            });
        return res.status(200).send({ data: menu, message: "Menu found" });
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while getting menu",
        });
    }
};
const getAllMenus = async (req, res) => {
    //Get Params filter
    const { filter } = req.query;
    if (typeof filter !== "string" && filter !== undefined)
        return res.status(400).send({
            message: "Filter must be string",
        });
    try {
        const menus = await (filter
            ? menu_service_1.default.getAllWithFilter(filter)
            : menu_service_1.default.getAll());
        return res.status(200).send({ message: "Menus found", data: menus });
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while getting menus",
        });
    }
};
const nameSchema = zod_1.default
    .string({ required_error: "Name is required" })
    .trim()
    .min(4)
    .max(20);
const createMenu = async (req, res) => {
    let { name, parentId, } = req.body;
    try {
        name = nameSchema.parse(name);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            return res
                .status(400)
                .json({ message: error.errors?.[0]?.message || "Server Error" });
        }
        else {
            return res.status(400).json({ message: "Server Error" });
        }
    }
    try {
        //check if the menu exists  in database
        const menuExists = await menu_service_1.default.getMenuByName(name);
        if (menuExists)
            return res.status(400).send({
                message: "Menu already exists",
            });
        const parent = Number(parentId);
        const payload = {
            name,
            parentId: null,
        };
        if (!isNaN(parent)) {
            const existParent = await menu_service_1.default.get(parent);
            if (existParent)
                payload.parentId = parent;
        }
        //create menu in database
        const menu = await menu_service_1.default.create(payload);
        return res.status(201).send(menu);
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while creating menu",
        });
    }
};
const deleteMenu = async (req, res) => {
    const { id } = req;
    try {
        //check if the menu exists  in database
        const menu = await menu_service_1.default.get(id);
        if (!menu)
            return res.status(404).send({
                message: "Menu not found",
            });
        // Check if the menu has children
        if (menu?.children)
            return res.status(400).send({
                message: "Menu has children and cannot be deleted",
            });
        //delete menu in database
        await menu_service_1.default.delete(id);
        return res.status(200).send({ message: "Menu deleted" });
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while deleting menu",
        });
    }
};
const updateMenu = async (req, res) => {
    let { name } = req.body;
    const { id } = req;
    try {
        name = nameSchema.parse(name);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            return res
                .status(400)
                .json({ message: error.errors?.[0]?.message || "Server Error" });
        }
        else {
            return res.status(400).json({ message: "Server Error" });
        }
    }
    try {
        //check if the menu exists  in database
        const menuExists = await menu_service_1.default.get(id);
        if (!menuExists)
            return res.status(404).send({
                message: "Menu not found",
            });
        const menuExistsByName = await menu_service_1.default.getMenuByName(name);
        if (menuExistsByName && menuExistsByName.id !== id)
            return res.status(400).send({
                message: "Menu with this name already exists",
            });
        //update menu in database
        const menu = await menu_service_1.default.update(id, { name });
        return res.status(200).send({ data: menu, message: "Menu updated" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error while updating menu",
        });
    }
};
const MenuController = Object.freeze({
    getMenu,
    getAllMenus,
    createMenu,
    deleteMenu,
    updateMenu,
});
exports.default = MenuController;
//# sourceMappingURL=menu.controller.js.map