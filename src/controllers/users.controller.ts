import { User } from "@/models";
import UsersService from "@/services/users.service";
import { hashPassword, signJwt } from "@/utils";
import type { RequestHandler } from "express";
import e from "express";
import zod from "zod";

// In this case for the validation of the fields we are going to use zod
// The requirements of only an example for the OPRATEL work test
const validation = {
  username: zod
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(4)
    .max(20)
    .nonempty("Username is required"),
  name: zod
    .string({ required_error: "Name is required" })
    .trim()
    .min(4)
    .max(20),
  lastname: zod
    .string({ required_error: "Lastname is required" })
    .trim()
    .min(4)
    .max(20),
  email: zod.string({ required_error: "Email is required" }).trim().email(),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8),
};
const schema = zod.object(validation);

const getUser: RequestHandler = async (req, res) => {
  const { id: id_ } = req.params;
  // check if id is valid
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).json({ message: "Id is not valid" });
  try {
    const user = await UsersService.get(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _, ...userWithoutPassword } = user;
    return res
      .status(200)
      .json({ message: "User found", data: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting user" });
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UsersService.getAllUsers();
    return res.status(200).json({ message: "Users found", data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while getting users" });
  }
};

const createUser: RequestHandler = async (req, res) => {
  const { username, name, lastname, email, password } = req.body;
  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique with zod
  try {
    schema.parse(req.body);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(+error.errors?.[0]?.code || 400)
        .json({ message: error.errors?.[0]?.message || "Server Error" });
    } else if (error instanceof Error) {
      return res.status(400).json({ message: "Server Error" });
    }
  }
  try {
    //check if user with this email or user already exist
    const user = await UsersService.getUserByEmailOrUsername({
      email,
      username,
    });
    if (user)
      return res.status(400).json({
        message:
          user.email === email.toLowerCase().trim()
            ? "User with this email already exist"
            : "User with this username already exist",
      });
    //hash password
    const hashedPassword = await hashPassword(password);
    //create user
    const newUser = await UsersService.create({
      username,
      name,
      lastname,
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
  const { username, name, lastname, email, password } = req.body;

  const { id: id_ } = req.params;
  // check if id is valid
  const id = Number(id_);
  if (isNaN(id)) return res.status(400).json({ message: "User is not valid" });
  const payload = {} as Partial<Omit<User, "id" | "status">>;
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
        validation[key as keyof typeof validation].parse(value);
        payload[key as keyof typeof payload] =
          typeof value === "string" ? value.trim() : value;
      }
    });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors?.[0]?.message || "Server Error" });
    } else {
      return res.status(400).json({ message: "Server Error" });
    }
  }

  try {
    const userExist = await UsersService.get(Number(id));
    if (!userExist) return res.status(404).json({ message: "User not found" });
    //check if user with this email or user already exist
    const user = await UsersService.getUserByEmailOrUsername({
      email: payload.email as string,
      username: payload.username as string,
    });
    if (user && user.id !== id) {
      return res.status(400).json({
        message:
          user.username === payload.username?.toLowerCase()
            ? "User with this username already exist"
            : "User with this email already exist",
      });
    }
    const userUpdated = await UsersService.update(id, payload);
    return res.status(200).json({ message: "User updated", data: userUpdated });
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
