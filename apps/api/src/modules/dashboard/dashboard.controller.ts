import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DashboardService } from "./dashboard.service";
import { catchAsync, sendResponse } from "@utils";

export class DashboardController {
  static getStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await DashboardService.getStats();
    
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Dashboard stats retrieved successfully",
      data: stats,
    });
  });
}

