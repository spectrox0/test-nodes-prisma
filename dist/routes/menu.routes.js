"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Routes express.js to menu controller
const menu_controller_1 = __importDefault(require("../controllers/menu.controller"));
const idValidation_1 = require("../middlewares/idValidation");
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
//Routes express.js to menu controller
exports.router.get(`/:id`, middlewares_1.isAuthenticated, idValidation_1.isValidID, menu_controller_1.default.getMenu);
exports.router.get("/", middlewares_1.isAuthenticated, menu_controller_1.default.getAllMenus);
exports.router.post("/", middlewares_1.isAuthenticated, menu_controller_1.default.createMenu);
exports.router.delete("/:id", middlewares_1.isAuthenticated, idValidation_1.isValidID, menu_controller_1.default.deleteMenu);
exports.router.put("/:id", middlewares_1.isAuthenticated, idValidation_1.isValidID, menu_controller_1.default.updateMenu);
//# sourceMappingURL=menu.routes.js.map