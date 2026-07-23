"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_codes_1 = require("http-status-codes");
const post_route_1 = __importDefault(require("./modules/post/post.route"));
const category_route_1 = __importDefault(require("./modules/category/category.route"));
const feedback_route_1 = __importDefault(require("./modules/feedback/feedback.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const dashboard_route_1 = __importDefault(require("./modules/dashboard/dashboard.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const keyword_route_1 = __importDefault(require("./modules/keyword/keyword.route"));
const _middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(_middlewares_1.apiLogger);
// Rate Limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: "fail",
        message: "Too many requests from this IP. Please try again later.",
    },
});
app.use("/api", limiter);
// Routes
app.use("/api/blogs", post_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/feedbacks", feedback_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/keywords", keyword_route_1.default);
app.get("/health", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "OK", timestamp: new Date() });
});
// 404 Not Found Handler
app.use(_middlewares_1.notFound);
// Global Error Handler
app.use(_middlewares_1.globalErrorHandler);
exports.default = app;
