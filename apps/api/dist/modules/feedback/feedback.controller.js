"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const http_status_codes_1 = require("http-status-codes");
const feedback_service_1 = require("./feedback.service");
const _utils_1 = require("../../utils");
class FeedbackController {
    static getFeedbacks = (0, _utils_1.catchAsync)(async (req, res) => {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await feedback_service_1.FeedbackService.getFeedbacks(search, page, limit);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Feedbacks retrieved successfully",
            data: result.items,
            meta: {
                page: result.page,
                limit: result.limit,
                total: result.total,
            },
        });
    });
    static submitFeedback = (0, _utils_1.catchAsync)(async (req, res) => {
        const data = req.body;
        const userId = req.body.userId;
        const feedback = await feedback_service_1.FeedbackService.createFeedback(data, userId);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Feedback submitted successfully",
            data: feedback,
        });
    });
    static deleteFeedback = (0, _utils_1.catchAsync)(async (req, res) => {
        const id = req.query.id;
        await feedback_service_1.FeedbackService.deleteFeedback(id);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Feedback deleted successfully",
            data: null,
        });
    });
}
exports.FeedbackController = FeedbackController;
