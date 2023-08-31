"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const utils_1 = require("../utils");
// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users_service_1.default.getUserByField("email", email);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const match = await (0, utils_1.verifyPassword)(password, user.password);
        if (!match) {
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
//Resister Controller
const register = async (req, res) => {
    const { username, name, lastName, email, password } = req.body;
    //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique
    if (!username.trim() ||
        !name.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password.trim())
        return res.status(400).json({ message: "All fields are required" });
    if (!/\S+@\S+\.\S+/.test(email))
        return res.status(400).json({ message: "Invalid email format" });
    if (password.length < 8)
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters" });
    if (username.length < 4)
        return res
            .status(400)
            .json({ message: "Username must be at least 4 characters" });
    try {
        const user = await users_service_1.default.getUserByField("email", email);
        //check if user already exists
        if (user)
            return res.status(400).json({ message: "User already exists" });
        //hash password
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        //create user
        const newUser = await users_service_1.default.create({
            username,
            name,
            lastName,
            email,
            password: hashedPassword,
        });
        const token = (0, utils_1.signJwt)({ id: newUser.id });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while creation of user" });
    }
};
const AuthenticationController = Object.freeze({
    login,
    register,
});
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map