"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const utils_1 = require("../utils");
const zod_1 = __importDefault(require("zod"));
const schema = zod_1.default.object({
    username: zod_1.default.string().trim().min(4).max(20),
    name: zod_1.default.string().trim().min(4).max(20),
    lastName: zod_1.default.string().trim().min(4).max(20),
    email: zod_1.default.string().trim().email(),
    password: zod_1.default.string().trim().min(8),
});
const getUser = async (req, res) => { };
const getAllUsers = async (req, res) => { };
const createUser = async (req, res) => {
    const { username, name, lastName, email, password } = req.body;
    //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
    try {
        schema.parse(req.body);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
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
            lastname: lastName,
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
const getMenuByUser = async (req, res) => { };
const deleteUser = async (req, res) => {
    const { id: id_ } = req.params;
    // check if id is valid
    const id = Number(id_);
    if (isNaN(id))
        return res.status(400).json({ message: "Id is not valid" });
    try {
        const user = await users_service_1.default.get(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        await users_service_1.default.delete(id);
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while deleting user" });
    }
};
const updateUser = async (req, res) => {
    const { username, name, lastname, email, password, id: id_ } = req.body;
    // check if id is valid
    const id = Number(id_);
    if (isNaN(id))
        return res.status(400).json({ message: "Id is not valid" });
    //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
    try {
        schema.parse({ username, name, lastname, email, password });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
    try {
        const userExist = await users_service_1.default.get(Number(id));
        if (!userExist)
            return res.status(404).json({ message: "User not found" });
        const user = await users_service_1.default.update(id, {
            username,
            name,
            lastname,
            email,
            password,
        });
        return res.status(200).json({ message: "User updated", data: user });
    }
    catch (error) {
        //Log error
        console.error(error);
        return res.status(500).json({ message: "Error while updating user" });
    }
};
const UsersController = Object.freeze({
    getUser,
    getAllUsers,
    createUser,
    getMenuByUser,
    deleteUser,
    updateUser,
});
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map