import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
import postRouter from "./modules/post/post.route";
import categoryRouter from "./modules/category/category.route";
import feedbackRouter from "./modules/feedback/feedback.route";
import userRouter from "./modules/user/user.route";
import dashboardRouter from "./modules/dashboard/dashboard.route";
import authRouter from "./modules/auth/auth.route";
import keywordRouter from "./modules/keyword/keyword.route";
import { apiLogger, notFound, globalErrorHandler } from "@middlewares";

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(apiLogger);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many requests from this IP. Please try again later.",
  },
});
app.use("/api", limiter);

// Routes
app.use("/api/blogs", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);
app.use("/api/keywords", keywordRouter);
app.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "OK", timestamp: new Date() });
});

// 404 Not Found Handler
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
