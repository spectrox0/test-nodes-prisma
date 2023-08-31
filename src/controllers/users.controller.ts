import UsersService from "@/services/users.service";
import { hashPassword, signJwt } from "@/utils";
import type { RequestHandler } from "express";
import zod from "zod";

const schema = zod.object({
  username: zod.string().trim().min(4).max(20),
  name: zod.string().trim().min(4).max(20),
  lastName: zod.string().trim().min(4).max(20),
  email: zod.string().trim().email(),
  password: zod.string().trim().min(8),
});

const getUser: RequestHandler = async (req, res) => {};

const getAllUsers: RequestHandler = async (req, res) => {};

const createUser: RequestHandler = async (req, res) => {
  const { username, name, lastName, email, password } = req.body;
  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
  try {
    schema.parse(req.body);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
  try {
    const user = await UsersService.getUserByField("email", email);
    //check if user already exists
    if (user) return res.status(400).json({ message: "User already exists" });
    //hash password
    const hashedPassword = await hashPassword(password);
    //create user
    const newUser = await UsersService.create({
      username,
      name,
      lastname: lastName,
      email,
      password: hashedPassword,
    });
    const token = signJwt({ id: newUser.id });
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while creation of user" });
  }
};

const getMenuByUser: RequestHandler = async (req, res) => {};

const deleteUser: RequestHandler = async (req, res) => {
  const { id: id_ } = req.params;
  // check if id is valid
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).json({ message: "Id is not valid" });
  try {
    const user = await UsersService.get(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await UsersService.delete(id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while deleting user" });
  }
};

const updateUser: RequestHandler = async (req, res) => {
  const { username, name, lastname, email, password, id: id_ } = req.body;
  // check if id is valid
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).json({ message: "Id is not valid" });

  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
  try {
    schema.parse({ username, name, lastname, email, password });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
  try {
    const userExist = await UsersService.get(Number(id));
    if (!userExist) return res.status(404).json({ message: "User not found" });
    const user = await UsersService.update(id, {
      username,
      name,
      lastname,
      email,
      password,
    });
    return res.status(200).json({ message: "User updated", data: user });
  } catch (error) {
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
} as const satisfies Record<string, RequestHandler>);
export default UsersController;
