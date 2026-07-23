import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { requireAdmin } from "@middlewares";

const router = Router();

router.use(requireAdmin);

router.get("/stats", DashboardController.getStats);

export default router;

