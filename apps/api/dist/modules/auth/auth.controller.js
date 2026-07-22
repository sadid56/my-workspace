"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const auth_1 = require("../../lib/auth");
const database_1 = require("@repo/database");
class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required" });
            }
            const user = await database_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid email or password" });
            }
            const isMatch = (0, auth_1.comparePassword)(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid email or password" });
            }
            if (user.role !== "ADMIN") {
                return res.status(403).json({ success: false, message: "Forbidden. Admin access required." });
            }
            const token = (0, auth_1.signToken)({ id: user.id, email: user.email, role: user.role });
            // Set cookie
            res.cookie("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            return res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        }
        catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    static async logout(req, res) {
        try {
            res.clearCookie("admin_token");
            return res.status(200).json({ success: true, message: "Logged out successfully" });
        }
        catch (error) {
            console.error("Logout error:", error);
            return res.status(500).json({ success: false, message: "Failed to log out" });
        }
    }
    static async checkUser(req, res) {
        try {
            const { email } = req.body;
            const result = await auth_service_1.AuthService.checkUser(email);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("checkUser error:", error);
            return res.status(500).json({ success: false, message: "Failed to check user" });
        }
    }
    static async getCurrentUser(req, res) {
        try {
            const token = req.cookies.admin_token;
            if (!token) {
                return res.status(401).json({ error: "Unauthorized: No token provided" });
            }
            const decoded = (0, auth_1.verifyToken)(token);
            if (!decoded) {
                return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
            }
            const user = await auth_service_1.AuthService.getUserById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: "Unauthorized: User not found" });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            console.error("getCurrentUser error:", error);
            return res.status(500).json({ error: "Failed to get current user" });
        }
    }
}
exports.AuthController = AuthController;
