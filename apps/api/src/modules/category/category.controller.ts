import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryService } from "./category.service";
import { catchAsync, sendResponse } from "@utils";

export class CategoryController {
  static getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await CategoryService.getCategories();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Categories retrieved successfully",
      data: categories,
    });
  });

  static createCategory = catchAsync(async (req: Request, res: Response) => {
    const { title } = req.body;
    const category = await CategoryService.createCategory(title);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Category created successfully",
      data: category,
    });
  });
}

