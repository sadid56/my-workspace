import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FeedbackService } from "./feedback.service";
import { catchAsync, sendResponse } from "@utils";

export class FeedbackController {
  static getFeedbacks = catchAsync(async (req: Request, res: Response) => {
    const search = (req.query.search as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await FeedbackService.getFeedbacks(search, page, limit);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Feedbacks retrieved successfully",
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
      },
    });
  });

  static submitFeedback = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.body.userId;

    const feedback = await FeedbackService.createFeedback(data, userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  });

  static deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    const id = req.query.id as string;
    await FeedbackService.deleteFeedback(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Feedback deleted successfully",
      data: null,
    });
  });
}

