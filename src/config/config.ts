import dotenv from "dotenv";
import zod from "zod";

dotenv.config();
// Schema for the config object
const schema = zod.object({
  PORT: zod.string().default("3000"),
  JWT_SECRET_KEY: zod.string().default("secret"),
});

// Singleton config object to store all the configuration variables in the application
export const config: Partial<typeof schema._type> = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
