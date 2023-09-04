"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidID = void 0;
const isValidID = (req, res, next) => {
    const { id: id_ } = req.params;
    const id = Number(id_);
    if (isNaN(id))
        return res.status(400).json({ message: "ID is not valid" });
    req.id = id;
    next();
};
exports.isValidID = isValidID;
//# sourceMappingURL=idValidation.js.map