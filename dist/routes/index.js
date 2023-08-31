"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRoutes = exports.UsersRoutes = exports.MenuRoutes = void 0;
var menu_routes_1 = require("./menu.routes");
Object.defineProperty(exports, "MenuRoutes", { enumerable: true, get: function () { return __importDefault(menu_routes_1).default; } });
var users_routes_1 = require("./users.routes");
Object.defineProperty(exports, "UsersRoutes", { enumerable: true, get: function () { return __importDefault(users_routes_1).default; } });
var authentication_routes_1 = require("./authentication.routes");
Object.defineProperty(exports, "AuthenticationRoutes", { enumerable: true, get: function () { return __importDefault(authentication_routes_1).default; } });
//# sourceMappingURL=index.js.map