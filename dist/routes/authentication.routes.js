"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const authentication_controller_1 = __importDefault(require("../controllers/authentication.controller"));
const express_1 = require("express");
exports.router = (0, express_1.Router)();
//Routes express.js to menu controller
exports.router.post("/login", authentication_controller_1.default.login);
//# sourceMappingURL=authentication.routes.js.map