"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_service_1 = __importDefault(require("../services/menu.service"));
const getMenu = async (req, res) => {
    const { id: id_ } = req.params;
    const id = Number(id_);
    if (isNaN(id))
        return res.status(400).send({ message: "Id is not valid" });
    //get menu from database
    try {
        const menu = await menu_service_1.default.get(id);
        if (!menu)
            return res.status(404).send({
                message: "Menu not found",
            });
        return res.status(200).send(menu);
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while getting menu",
        });
    }
};
const getAllMenus = async (req, res) => {
    try {
        return res.status(200).send({ message: "Menus found", data: [] });
        const menus = await menu_service_1.default.getAll();
        return res.status(200).send({ message: "Menus found", data: menus });
    }
    catch (error) {
        return res.status(500).send({
            message: "Error while getting menus",
        });
    }
};
const createMenu = async (req, res) => { };
const deleteMenu = async (req, res) => { };
const updateMenu = async (req, res) => { };
const MenuController = Object.freeze({
    getMenu,
    getAllMenus,
    createMenu,
    deleteMenu,
    updateMenu,
});
exports.default = MenuController;
//# sourceMappingURL=menu.controller.js.map