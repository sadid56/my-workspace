"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
class DashboardController {
    static async getStats(req, res) {
        try {
            const stats = await dashboard_service_1.DashboardService.getStats();
            return res.status(200).json(stats);
        }
        catch (error) {
            console.error("getStats controller error:", error);
            return res.status(500).json({ error: "Failed to fetch dashboard stats" });
        }
    }
}
exports.DashboardController = DashboardController;
