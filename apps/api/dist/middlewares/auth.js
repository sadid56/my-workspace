"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const http_status_codes_1 = require("http-status-codes");
const _lib_1 = require("../lib");
const _utils_1 = require("../utils");
function requireAdmin(req, res, next) {
    const token = req.cookies.admin_token;
    if (!token) {
        throw new _utils_1.AppError("Unauthorized: Token missing", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const decoded = (0, _lib_1.verifyToken)(token);
    if (!decoded || decoded.role !== "ADMIN") {
        throw new _utils_1.AppError("Forbidden: Admin access required", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    req.user = decoded;
    next();
}
