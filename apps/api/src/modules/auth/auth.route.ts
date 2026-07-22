import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/check-user", AuthController.checkUser);
router.get("/current-user", AuthController.getCurrentUser);

export default router;
