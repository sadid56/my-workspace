"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const feedback_controller_1 = require("./feedback.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const submitFeedbackSchema = zod_1.z.object({
    body: zod_1.z.object({
        emoji: zod_1.z.string({ required_error: "Emoji is required" }).min(1),
        feedback: zod_1.z.string({ required_error: "Feedback is required" }).min(1),
        postId: zod_1.z.string().optional(),
        anonymous: zod_1.z.boolean().optional(),
        userId: zod_1.z.string().optional(),
    }),
});
const deleteFeedbackSchema = zod_1.z.object({
    query: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Feedback ID is required in query params" }).min(1),
    }),
});
router.get("/", feedback_controller_1.FeedbackController.getFeedbacks);
router.post("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(submitFeedbackSchema), feedback_controller_1.FeedbackController.submitFeedback);
router.delete("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(deleteFeedbackSchema), feedback_controller_1.FeedbackController.deleteFeedback);
exports.default = router;
