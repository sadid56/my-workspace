import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync, sendResponse } from "@utils";

export class UserController {
  static getUsers = catchAsync(async (req: Request, res: Response) => {
    const search = (req.query.search as string) || "";
    const users = await UserService.getUsers(search);
    
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Users retrieved successfully",
      data: users,
    });
  });
}



