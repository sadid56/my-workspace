import dotenv from "dotenv";
import path from "path";
import chalk from "chalk";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env.local") });

// Validate environment variables
import { validateEnv } from "@config/env";
const env = validateEnv();

import app from "./app";

// Format timestamp utility
const getTimestamp = () => chalk.gray(new Date().toLocaleTimeString());

// Start the server
const server = app.listen(env.PORT, () => {
  console.log(
    `[${getTimestamp()}] ${chalk.green.bold("⚡ [server]")} Server is running on port ${chalk.cyan(env.PORT)}`
  );
  console.log(
    `[${getTimestamp()}] ${chalk.green.bold("⚡ [server]")} Environment: ${chalk.yellow(env.NODE_ENV)}`
  );
});

process.on("uncaughtException", (error) => {
  console.error(
    `[${getTimestamp()}] ${chalk.red.bold("💥 [Uncaught Exception]")} ${chalk.red(error.message)}`
  );
  if (error.stack) {
    console.error(chalk.gray(error.stack));
  }
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.error(
    `[${getTimestamp()}] ${chalk.red.bold("💥 [Unhandled Rejection]")} Reason: ${chalk.red(
      reason instanceof Error ? reason.message : String(reason)
    )}`
  );
  if (reason instanceof Error && reason.stack) {
    console.error(chalk.gray(reason.stack));
  }
  
  server.close(() => {
    process.exit(1);
  });
});
const handleShutdown = (signal: string) => {
  console.log(
    `\n[${getTimestamp()}] ${chalk.yellow.bold(`👋 [${signal}]`)} Received signal. Starting graceful shutdown...`
  );

  server.close(() => {
    console.log(
      `[${getTimestamp()}] ${chalk.green.bold("💤 [server]")} HTTP server closed successfully. Exiting process.`
    );
    process.exit(0);
  });

  // Force close after 10s if graceful shutdown hangs
  setTimeout(() => {
    console.error(
      `[${getTimestamp()}] ${chalk.red.bold("🚨 [server]")} Graceful shutdown timed out. Force exiting.`
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

