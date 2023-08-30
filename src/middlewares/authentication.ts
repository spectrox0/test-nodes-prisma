// Import the necessary types Request , Response and NextFunction
import type { Request, Response, NextFunction } from "express";
// Import the jsonwebtoken library
import jwt from "jsonwebtoken";
//Middleware to check if the user is authenticated or not with the help of the token and the secret key using jsonwebtoken librar
const Unauthorized = (res: Response) =>
  res.status(401).json({ message: "Unauthorized" });
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];
  // Get the secret key from the environment variable
  const secretKey = process.env.JWT_SECRET_KEY;
  // If the token is not present in the request header return Unauthorized
  if (!token) return Unauthorized(res);
  // Verify the token with the secret key
  try {
    const user = jwt.verify(token, secretKey as string);
    // If the token is verified successfully, set the user in the request object
    console.log(user);
    // Call the next middleware
    next();
  } catch (error) {
    // If the token is not verified successfully return Unauthorized
    return Unauthorized(res);
  }
};
