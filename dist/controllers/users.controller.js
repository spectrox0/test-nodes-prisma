"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_service_1 = __importDefault(require("../services/menu.service"));
const users_service_1 = __importDefault(require("../services/users.service"));
const utils_1 = require("../utils");
const zod_1 = __importDefault(require("zod"));
// In this case for the validation of the fields we are going to use zod
// The requirements of only an example for the OPRATEL work test
const validation = {
    username: zod_1.default
        .string({
        required_error: "Username is required",
    })
        .trim()
        .min(4)
        .max(20)
        .nonempty("Username is required"),
    name: zod_1.default
        .string({ required_error: "Name is required" })
        .trim()
        .min(4)
        .max(20),
    lastname: zod_1.default
        .string({ required_error: "Lastname is required" })
        .trim()
        .min(4)
        .max(20),
    email: zod_1.default.string({ required_error: "Email is required" }).trim().email(),
    password: zod_1.default
        .string({
        required_error: "Password is required",
    })
        .trim()
        .min(8),
};
const schema = zod_1.default.object(validation);
const getUser = async (req, res) => {
    try {
        const user = await users_service_1.default.get(req.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const { password: _, ...userWithoutPassword } = user;
        return res
            .status(200)
            .json({ message: "User found", data: userWithoutPassword });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while getting user" });
    }
};
const getAllUsers = async (req, res) => {
    const { filter } = req.query;
    if (typeof filter !== "string" && filter !== undefined)
        return res.status(400).json({ message: "Filter must be string" });
    try {
        const users = await (filter
            ? users_service_1.default.getAllUsersWithFilter(filter)
            : users_service_1.default.getAllUsers());
        return res.status(200).json({ message: "Users found", data: users });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while getting users" });
    }
};
const createUser = async (req, res) => {
    const { username, name, lastname, email, password } = req.body;
    //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
    try {
        schema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            return res
                .status(+error.errors?.[0]?.code || 400)
                .json({ message: error.errors?.[0]?.message || "Server Error" });
        }
        else if (error instanceof Error) {
            return res.status(400).json({ message: "Server Error" });
        }
    }
    try {
        //check if user with this email or user already exist
        const user = await users_service_1.default.getUserByEmailOrUsername({
            email,
            username,
        });
        if (user)
            return res.status(400).json({
                message: user.email === email.toLowerCase().trim()
                    ? "User with this email already exist"
                    : "User with this username already exist",
            });
        //hash password
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        //create user
        const newUser = await users_service_1.default.create({
            username,
            name,
            lastname,
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
const getMenuByUser = async (req, res) => {
    const { id } = req;
    try {
        const menus = await users_service_1.default.getAllMenusByUserId(id);
        return res.status(200).send({ data: menus, message: "Menus found" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error gettings menus by user" });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req;
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
    const { username, name, lastname, email, password } = req.body;
    const { id } = req;
    const payload = {};
    //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
    try {
        Object.entries({
            username,
            name,
            lastname,
            email: email?.toLowerCase?.(),
            password,
        }).forEach(([key, value]) => {
            if (value?.trim?.()) {
                validation[key].parse(value);
                payload[key] =
                    typeof value === "string" ? value.trim() : value;
            }
        });
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            return res
                .status(400)
                .json({ message: error.errors?.[0]?.message || "Server Error" });
        }
        else {
            return res.status(400).json({ message: "Server Error" });
        }
    }
    try {
        const userExist = await users_service_1.default.get(id);
        if (!userExist)
            return res.status(404).json({ message: "User not found" });
        //check if user with this email or user already exist
        const user = await users_service_1.default.getUserByEmailOrUsername({
            email: payload.email,
            username: payload.username,
        });
        if (user && user.id !== id) {
            return res.status(400).json({
                message: user.username === payload.username?.toLowerCase()
                    ? "User with this username already exist"
                    : "User with this email already exist",
            });
        }
        const userUpdated = await users_service_1.default.update(id, payload);
        return res.status(200).json({ message: "User updated", data: userUpdated });
    }
    catch (error) {
        //Log error
        console.error(error);
        return res.status(500).json({ message: "Error while updating user" });
    }
};
const associateMenusToUser = async (req, res) => {
    const { userId: id, menus = [], } = req.body;
    //check if user exists
    const user = await users_service_1.default.get(id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    //get menus from body
    // Cast all values to number
    const menuIDs = menus.map(Number);
    //Check if all menus are valid
    const invalidMenus = menuIDs.some(menu => isNaN(menu));
    if (invalidMenus)
        return res.status(400).json({ message: "Menus are not valid" });
    try {
        //Verify if the menus exist in database and are active and are not submenus of another menu
        const menusExist = (await menu_service_1.default.getListMenusByIds(menuIDs)).length === menus.length;
        if (!menusExist) {
            return res.status(400).json({ message: "Menus are not valid" });
        }
        const menusToUser = await users_service_1.default.associateMenusToUser(id, menuIDs);
        if (!menusToUser.added?.length && !menusToUser.removed?.length) {
            return res
                .status(400)
                .json({ message: "an error occurred while associating the menus" });
        }
        res.status(200).json({ message: "Menus associated", data: menusToUser });
    }
    catch (error) {
        //Log error
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const UsersController = Object.freeze({
    getUser,
    getAllUsers,
    createUser,
    getMenuByUser,
    associateMenusToUser,
    deleteUser,
    updateUser,
});
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map