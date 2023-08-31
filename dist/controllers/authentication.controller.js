"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const utils_1 = require("../utils");
// Login Controller
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await users_service_1.default.getUserByField("username", username);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const match = await (0, utils_1.verifyPassword)(password, user.password);
        if (!match) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = (0, utils_1.signJwt)({ id: user.id });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while login" });
    }
};
const AuthenticationController = Object.freeze({
    login,
});
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map