"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Routes express.js to menu controller
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const express_1 = require("express");
const baseRoute = "menus";
const router = (0, express_1.Router)();
//Routes express.js to menu controller
router.get(`${baseRoute}/:id`, users_controller_1.default.getUser);
router.get(`${baseRoute}/`, users_controller_1.default.getAllUsers);
router.post(`${baseRoute}/`, users_controller_1.default.createUser);
router.delete(`${baseRoute}/:id`, users_controller_1.default.deleteUser);
router.put(`${baseRoute}/:id`, users_controller_1.default.updateUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map