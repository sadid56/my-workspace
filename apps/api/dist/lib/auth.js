"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.requireAdmin = requireAdmin;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-123456";
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const hash = crypto_1.default.scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}
function comparePassword(password, stored) {
    try {
        const [salt, hash] = stored.split(":");
        const match = crypto_1.default.scryptSync(password, salt, 64).toString("hex");
        return hash === match;
    }
    catch (error) {
        return false;
    }
}
function signToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
}
function requireAdmin(req, res, next) {
    const token = req.cookies.admin_token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized. Token missing." });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
        return res.status(403).json({ success: false, message: "Forbidden. Admin access required." });
    }
    req.user = decoded;
    next();
}
