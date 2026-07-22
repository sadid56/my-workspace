"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    static async getUsers(req, res) {
        try {
            const search = req.query.search || "";
            const users = await user_service_1.UserService.getUsers(search);
            return res.status(200).json(users);
        }
        catch (error) {
            console.error("getUsers controller error:", error);
            return res.status(500).json({ error: "Failed to fetch users data" });
        }
    }
}
exports.UserController = UserController;
