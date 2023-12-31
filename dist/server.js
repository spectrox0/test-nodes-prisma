"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
require("./config/database");
const bootstrap = (port = config_1.config.PORT) => {
    //Instance of express
    const app = (0, express_1.default)();
    // Include all middlewares
    [
        // Body Parse
        express_1.default.json(),
        // Parse application/x-www-form-urlencoded
        express_1.default.urlencoded({ extended: true }),
        // Helmet helps you secure your Express apps by setting various HTTP headers.
        (0, helmet_1.default)(),
        // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
        (0, cors_1.default)(),
    ]
        // Add middlewares to express app instance
        .forEach(middleware => app.use(middleware));
    //Include all routes
    const addRoute = (baseApi, route) => {
        app.use(`/api/${baseApi}`, route);
    };
    addRoute("menus", routes_1.MenuRoutes);
    addRoute("auth", routes_1.AuthenticationRoutes);
    addRoute("users", routes_1.UsersRoutes);
    //Middlewares to parse the request body
    //body parser, helmet and cors
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    return { server, app };
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=server.js.map