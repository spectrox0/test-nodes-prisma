"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const signJwt = (payload, options = {}) => {
    const privateKey = Buffer.from(config_1.config.JWT_SECRET_KEY, "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        algorithm: "RS256",
    });
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const publicKey = Buffer.from(config_1.config.JWT_SECRET_KEY, "base64").toString("ascii");
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map