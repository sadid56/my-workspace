import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const search = (req.query.search as string) || "";
      const users = await UserService.getUsers(search);
      return res.status(200).json(users);
    } catch (error) {
      console.error("getUsers controller error:", error);
      return res.status(500).json({ error: "Failed to fetch users data" });
    }
  }
}
