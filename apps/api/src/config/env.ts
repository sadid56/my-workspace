import { z } from "zod";
import chalk from "chalk";

const envSchema = z.object({
  PORT: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 4000)),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string({ required_error: "DATABASE_URL is required" }).min(1),
  JWT_SECRET: z.string({ required_error: "JWT_SECRET is required" }).min(1),
  CLOUDINARY_CLOUD_NAME: z.string({ required_error: "CLOUDINARY_CLOUD_NAME is required" }).min(1),
  CLOUDINARY_API_KEY: z.string({ required_error: "CLOUDINARY_API_KEY is required" }).min(1),
  CLOUDINARY_API_SECRET: z.string({ required_error: "CLOUDINARY_API_SECRET is required" }).min(1),
  GOOGLE_APP_EMAIL: z.string({ required_error: "GOOGLE_APP_EMAIL is required" }).email(),
  GOOGLE_APP_PASSWORD: z.string({ required_error: "GOOGLE_APP_PASSWORD is required" }).min(1),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

export function validateEnv(): Env {
  if (env) return env;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const getTimestamp = () => chalk.gray(new Date().toLocaleTimeString());
    console.error(
      `[${getTimestamp()}] ${chalk.red.bold("🚨 [Env Config Error]")} Invalid environment variables:`
    );
    
    parsed.error.errors.forEach((err) => {
      console.error(
        `  - ${chalk.yellow(err.path.join("."))}: ${chalk.red(err.message)}`
      );
    });

    process.exit(1);
  }

  env = parsed.data;
  return env;
}

export { env };
