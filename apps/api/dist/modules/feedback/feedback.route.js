"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("./feedback.controller");
const router = (0, express_1.Router)();
router.get("/", feedback_controller_1.FeedbackController.getFeedbacks);
router.post("/", feedback_controller_1.FeedbackController.submitFeedback);
router.delete("/", feedback_controller_1.FeedbackController.deleteFeedback);
exports.default = router;
