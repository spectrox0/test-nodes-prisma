import UsersService from "@/services/users.service";
import type { RequestHandler } from "express";
import { hashPassword, signJwt, verifyPassword } from "utils";

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

const AuthenticationController = Object.freeze({
  login,
} as const satisfies Record<string, RequestHandler>);

export default AuthenticationController;
