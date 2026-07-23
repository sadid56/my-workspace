"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordController = void 0;
const http_status_codes_1 = require("http-status-codes");
const keyword_service_1 = require("./keyword.service");
const _utils_1 = require("../../utils");
class KeywordController {
    static getKeywords = (0, _utils_1.catchAsync)(async (req, res) => {
        const keywords = await keyword_service_1.KeywordService.getKeywords();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Keywords retrieved successfully",
            data: keywords,
        });
    });
    static getKeywordById = (0, _utils_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const keyword = await keyword_service_1.KeywordService.getKeywordById(id);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Keyword retrieved successfully",
            data: keyword,
        });
    });
    static createKeyword = (0, _utils_1.catchAsync)(async (req, res) => {
        const { title } = req.body;
        const keyword = await keyword_service_1.KeywordService.createKeyword(title);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Keyword created successfully",
            data: keyword,
        });
    });
    static updateKeyword = (0, _utils_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const { title, slug } = req.body;
        const keyword = await keyword_service_1.KeywordService.updateKeyword(id, title, slug);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Keyword updated successfully",
            data: keyword,
        });
    });
    static deleteKeyword = (0, _utils_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        await keyword_service_1.KeywordService.deleteKeyword(id);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Keyword deleted successfully",
            data: null,
        });
    });
}
exports.KeywordController = KeywordController;
