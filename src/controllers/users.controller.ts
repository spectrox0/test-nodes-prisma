import UsersService from "@/services/users.service";
import { hashPassword, signJwt } from "@/utils";
import type { RequestHandler } from "express";
import zod from "zod";

const getUser: RequestHandler = async (req, res) => {};

const getAllUsers: RequestHandler = async (req, res) => {};

const createUser: RequestHandler = async (req, res) => {
  const { username, name, lastName, email, password } = req.body;
  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
  const schema = zod.object({
    username: zod.string().trim().min(4).max(20),
    name: zod.string().trim().min(4).max(20),
    lastName: zod.string().trim().min(4).max(20),
    email: zod.string().trim().email(),
    password: zod.string().trim().min(8),
  });
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
      lastName,
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

const deleteUser: RequestHandler = async (req, res) => {};

const updateUser: RequestHandler = async (req, res) => {
  const { username, name, lastName, email, password, id } = req.body;
  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique
  if (
    !username?.trim() ||
    !name?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !id?.trim()
  )
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
    const user = await UsersService.getUserByField("email", email);
    //check if user already exists
    if (user) return res.status(400).json({ message: "User already exists" });
    //hash password
    const hashedPassword = await hashPassword(password);
    //create user
    const newUser = await UsersService.create({
      username,
      name,
      lastName,
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

const UsersController = Object.freeze({
  getUser,
  getAllUsers,
  createUser,
  getMenuByUser,
  deleteUser,
  updateUser,
} as const satisfies Record<string, RequestHandler>);
export default UsersController;
