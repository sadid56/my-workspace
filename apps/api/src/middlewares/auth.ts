import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken, AuthenticatedRequest } from "@lib";
import { AppError } from "@utils";

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.admin_token;
  if (!token) {
    throw new AppError("Unauthorized: Token missing", StatusCodes.UNAUTHORIZED);
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "ADMIN") {
    throw new AppError("Forbidden: Admin access required", StatusCodes.FORBIDDEN);
  }

  req.user = decoded;
  next();
}
