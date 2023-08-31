import dotenv from "dotenv";
import zod from "zod";

dotenv.config();
// Schema for the config object
const schema = zod.object({
  PORT: zod.string().default("3000"),
  JWT_SECRET_KEY: zod.string(),
});

// Singleton config object to store all the configuration variables in the application
export const config: typeof schema._type = schema.parse({
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
