import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";
import { verifyToken } from "@lib";
import { AppError, catchAsync, sendResponse } from "@utils";
  
export class AuthController {
  static login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { token, user } = await AuthService.login(email, password);

    // Set cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Logged in successfully",
      data: user,
    });
  });

  static logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("admin_token");
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Logged out successfully",
      data: null,
    });
  });

  static checkUser = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await AuthService.checkUser(email);
    
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User checked successfully",
      data: user,
    });
  });

  static getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.admin_token;
    if (!token) {
      throw new AppError("Unauthorized: No token provided", StatusCodes.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new AppError("Unauthorized: Invalid or expired token", StatusCodes.UNAUTHORIZED);
    }

    const user = await AuthService.getUserById(decoded.id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Current user retrieved successfully",
      data: user,
    });
  });
}
