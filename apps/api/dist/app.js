"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Import modular routers
const post_route_1 = __importDefault(require("./modules/post/post.route"));
const category_route_1 = __importDefault(require("./modules/category/category.route"));
const feedback_route_1 = __importDefault(require("./modules/feedback/feedback.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const dashboard_route_1 = __importDefault(require("./modules/dashboard/dashboard.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const keyword_route_1 = __importDefault(require("./modules/keyword/keyword.route"));
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(logger_1.apiLogger);
// Routes
app.use("/api/blogs", post_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/feedbacks", feedback_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/keywords", keyword_route_1.default);
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
});
exports.default = app;
