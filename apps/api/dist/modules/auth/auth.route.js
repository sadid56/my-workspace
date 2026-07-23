"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_controller_1 = require("./auth.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email format"),
        password: zod_1.z.string({ required_error: "Password is required" }).min(1, "Password is required"),
    }),
});
const checkUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email format"),
    }),
});
router.post("/login", (0, _middlewares_1.validate)(loginSchema), auth_controller_1.AuthController.login);
router.post("/logout", auth_controller_1.AuthController.logout);
router.post("/check-user", (0, _middlewares_1.validate)(checkUserSchema), auth_controller_1.AuthController.checkUser);
router.get("/current-user", auth_controller_1.AuthController.getCurrentUser);
exports.default = router;
