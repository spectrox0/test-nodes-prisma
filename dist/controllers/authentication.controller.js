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
            // No reveal if user exists or not for security reasons
            return res.status(401).json({ message: "Invalid credentials" });
        const match = await (0, utils_1.verifyPassword)(password, user.password);
        if (!match) {
            // No reveal if the password is incorrect or not for security reasons
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = (0, utils_1.signJwt)({ id: user.id });
        const { password: _, status: _status, ...userWithoutPassword } = user;
        return res.status(200).json({ token, user: userWithoutPassword });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while login" });
    }
};
const me = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await users_service_1.default.getUserByField("id", Number(id));
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const { password: _, status: _status, ...userWithoutPassword } = user;
        return res.status(200).json({ user: userWithoutPassword });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while getting user" });
    }
};
const AuthenticationController = Object.freeze({
    login,
    me,
});
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map