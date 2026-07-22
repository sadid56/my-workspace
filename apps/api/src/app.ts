import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import modular routers
import postRouter from "./modules/post/post.route";
import categoryRouter from "./modules/category/category.route";
import feedbackRouter from "./modules/feedback/feedback.route";
import userRouter from "./modules/user/user.route";
import dashboardRouter from "./modules/dashboard/dashboard.route";
import authRouter from "./modules/auth/auth.route";
import keywordRouter from "./modules/keyword/keyword.route";
import { apiLogger } from "./utils/logger";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(apiLogger);

// Routes
app.use("/api/blogs", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/users", userRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);
app.use("/api/keywords", keywordRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

export default app;
