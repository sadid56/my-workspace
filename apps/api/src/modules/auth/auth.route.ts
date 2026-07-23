import { Router } from "express";
import { z } from "zod";
import { AuthController } from "./auth.controller";
import { validate } from "@middlewares";

const router = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
  }),
});

const checkUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  }),
});

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/check-user", validate(checkUserSchema), AuthController.checkUser);
router.get("/current-user", AuthController.getCurrentUser);

export default router;

