"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_controller_1 = __importDefault(require("../controllers/menu.controller"));
const express_1 = require("express");
const baseRoute = "menus";
const router = (0, express_1.Router)();
//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, menu_controller_1.default.getMenu);
router.get(`${baseRoute}/`, menu_controller_1.default.getAllMenus);
router.post(`${baseRoute}/`, menu_controller_1.default.createMenu);
router.delete(`${baseRoute}/:id`, menu_controller_1.default.deleteMenu);
router.put(`${baseRoute}/:id`, menu_controller_1.default.updateMenu);
exports.default = router;
//# sourceMappingURL=authentication.routes.js.map