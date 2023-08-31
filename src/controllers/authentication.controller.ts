import UsersService from "@/services/users.service";
import type { RequestHandler } from "express";
import { hashPassword, signJwt, verifyJwt, verifyPassword } from "utils";

// Login Controller
const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersService.getUserByField("email", email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await verifyPassword(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = signJwt({ id: user.id });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while login" });
  }
};

//Resister Controller
const register: RequestHandler = async (req, res) => {
  const { username, name, lastName, email, password } = req.body;
  //validate fields are not empty and email is valid format and password is strong enough and username is unique and email is unique
  if (
    !username.trim() ||
    !name.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password.trim()
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
const AuthenticationController = Object.freeze({
  login,
  register,
} as const satisfies Record<string, RequestHandler>);

export default AuthenticationController;
