"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const http_status_codes_1 = require("http-status-codes");
const dashboard_service_1 = require("./dashboard.service");
const _utils_1 = require("../../utils");
class DashboardController {
    static getStats = (0, _utils_1.catchAsync)(async (req, res) => {
        const stats = await dashboard_service_1.DashboardService.getStats();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Dashboard stats retrieved successfully",
            data: stats,
        });
    });
}
exports.DashboardController = DashboardController;
