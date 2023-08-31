import UsersService from "@/services/users.service";
import type { RequestHandler } from "express";
import { signJwt, verifyPassword } from "utils";

// Login Controller
const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UsersService.getUserByField("username", username);
    if (!user)
      // No reveal if user exists or not for security reasons
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await verifyPassword(password, user.password);
    if (!match) {
      // No reveal if the password is incorrect or not for security reasons
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signJwt({ id: user.id });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while login" });
  }
};
const AuthenticationController = Object.freeze({
  login,
} as const satisfies Record<string, RequestHandler>);

export default AuthenticationController;
