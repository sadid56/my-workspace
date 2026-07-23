"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const _lib_1 = require("../../lib");
const _utils_1 = require("../../utils");
class AuthController {
    static login = (0, _utils_1.catchAsync)(async (req, res) => {
        const { email, password } = req.body;
        const { token, user } = await auth_service_1.AuthService.login(email, password);
        // Set cookie
        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Logged in successfully",
            data: user,
        });
    });
    static logout = (0, _utils_1.catchAsync)(async (req, res) => {
        res.clearCookie("admin_token");
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Logged out successfully",
            data: null,
        });
    });
    static checkUser = (0, _utils_1.catchAsync)(async (req, res) => {
        const { email } = req.body;
        const user = await auth_service_1.AuthService.checkUser(email);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "User checked successfully",
            data: user,
        });
    });
    static getCurrentUser = (0, _utils_1.catchAsync)(async (req, res) => {
        const token = req.cookies.admin_token;
        if (!token) {
            throw new _utils_1.AppError("Unauthorized: No token provided", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const decoded = (0, _lib_1.verifyToken)(token);
        if (!decoded) {
            throw new _utils_1.AppError("Unauthorized: Invalid or expired token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const user = await auth_service_1.AuthService.getUserById(decoded.id);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Current user retrieved successfully",
            data: user,
        });
    });
}
exports.AuthController = AuthController;
