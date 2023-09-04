"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Routes express.js to menu controller
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const middlewares_1 = require("../middlewares");
const idValidation_1 = require("../middlewares/idValidation");
const express_1 = require("express");
const baseRoute = "users";
exports.router = (0, express_1.Router)();
//Routes express.js to menu controller
exports.router.get("/:id", middlewares_1.isAuthenticated, idValidation_1.isValidID, users_controller_1.default.getUser);
exports.router.get("/", middlewares_1.isAuthenticated, users_controller_1.default.getAllUsers);
exports.router.post("/", middlewares_1.isAuthenticated, users_controller_1.default.createUser);
exports.router.delete("/:id", middlewares_1.isAuthenticated, idValidation_1.isValidID, users_controller_1.default.deleteUser);
exports.router.put("/:id", middlewares_1.isAuthenticated, idValidation_1.isValidID, users_controller_1.default.updateUser);
exports.router.post("/menus", middlewares_1.isAuthenticated, users_controller_1.default.associateMenusToUser);
exports.router.get("/:id/menus", middlewares_1.isAuthenticated, idValidation_1.isValidID, users_controller_1.default.getMenuByUser);
//# sourceMappingURL=users.routes.js.map