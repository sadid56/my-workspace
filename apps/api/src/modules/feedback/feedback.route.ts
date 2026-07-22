import { Router } from "express";
import { FeedbackController } from "./feedback.controller";

const router = Router();

router.get("/", FeedbackController.getFeedbacks);
router.post("/", FeedbackController.submitFeedback);
router.delete("/", FeedbackController.deleteFeedback);

export default router;
