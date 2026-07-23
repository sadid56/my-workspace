"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const _utils_1 = require("../../utils");
class UserController {
    static getUsers = (0, _utils_1.catchAsync)(async (req, res) => {
        const search = req.query.search || "";
        const users = await user_service_1.UserService.getUsers(search);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Users retrieved successfully",
            data: users,
        });
    });
}
exports.UserController = UserController;
