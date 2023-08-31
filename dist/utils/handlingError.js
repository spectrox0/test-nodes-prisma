"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
        this.statusCode = 401;
    }
}
exports.AuthenticationError = AuthenticationError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AuthenticationError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=handlingError.js.map