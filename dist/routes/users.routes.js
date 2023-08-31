"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//Routes express.js to menu controller
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const express_1 = require("express");
const baseRoute = "users";
exports.router = (0, express_1.Router)();
//Routes express.js to menu controller
exports.router.get("/:id", users_controller_1.default.getUser);
exports.router.get("/", users_controller_1.default.getAllUsers);
exports.router.delete("/:id", users_controller_1.default.deleteUser);
exports.router.put("/:id", users_controller_1.default.updateUser);
//# sourceMappingURL=users.routes.js.map