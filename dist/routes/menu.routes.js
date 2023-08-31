"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Routes express.js to menu controller
const menu_controller_1 = __importDefault(require("../controllers/menu.controller"));
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const baseRoute = "menus";
const router = (0, express_1.Router)();
//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, middlewares_1.isAuthenticated, menu_controller_1.default.getMenu);
router.get(`${baseRoute}/`, middlewares_1.isAuthenticated, menu_controller_1.default.getAllMenus);
router.post(`${baseRoute}/`, middlewares_1.isAuthenticated, menu_controller_1.default.createMenu);
router.delete(`${baseRoute}/:id`, middlewares_1.isAuthenticated, menu_controller_1.default.deleteMenu);
router.put(`${baseRoute}/:id`, middlewares_1.isAuthenticated, menu_controller_1.default.updateMenu);
exports.default = router;
//# sourceMappingURL=menu.routes.js.map