import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { KeywordService } from "./keyword.service";
import { catchAsync, sendResponse } from "@utils";

export class KeywordController {
  static getKeywords = catchAsync(async (req: Request, res: Response) => {
    const keywords = await KeywordService.getKeywords();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Keywords retrieved successfully",
      data: keywords,
    });
  });

  static getKeywordById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const keyword = await KeywordService.getKeywordById(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Keyword retrieved successfully",
      data: keyword,
    });
  });

  static createKeyword = catchAsync(async (req: Request, res: Response) => {
    const { title } = req.body;
    const keyword = await KeywordService.createKeyword(title);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Keyword created successfully",
      data: keyword,
    });
  });

  static updateKeyword = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, slug } = req.body;
    const keyword = await KeywordService.updateKeyword(id, title, slug);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Keyword updated successfully",
      data: keyword,
    });
  });

  static deleteKeyword = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await KeywordService.deleteKeyword(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Keyword deleted successfully",
      data: null,
    });
  });
}

