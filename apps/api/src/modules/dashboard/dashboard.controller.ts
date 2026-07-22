import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

export class DashboardController {
  static async getStats(req: Request, res: Response) {
    try {
      const stats = await DashboardService.getStats();
      return res.status(200).json(stats);
    } catch (error) {
      console.error("getStats controller error:", error);
      return res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  }
}
