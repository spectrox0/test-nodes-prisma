import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "config";
export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(config.JWT_SECRET_KEY, "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(config.JWT_SECRET_KEY, "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
