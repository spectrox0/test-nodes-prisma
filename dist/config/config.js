"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
dotenv_1.default.config();
// Schema for the config object
const schema = zod_1.default.object({
    PORT: zod_1.default.string().default("4002"),
    JWT_SECRET_KEY: zod_1.default.string(),
});
// Singleton config object to store all the configuration variables in the application
exports.config = Object.freeze(schema.parse({
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}));
//# sourceMappingURL=config.js.map