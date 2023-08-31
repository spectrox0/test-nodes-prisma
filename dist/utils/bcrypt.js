"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt_1.default.genSalt(saltRounds);
    const hash = await bcrypt_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hash) => {
    const match = await bcrypt_1.default.compare(password, hash);
    return match;
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=bcrypt.js.map