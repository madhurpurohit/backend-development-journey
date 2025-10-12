import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

// Here we are using path.join to get the absolute path of the .env file. Because when we don't have .env file in same folder than we have to use path.join to get the absolute path of the .env file. Otherwise it will show error. Or return undefined.
dotenv.config({ path: path.join(import.meta.dirname, "../.env") });

export const envSchema = z
  .object({
    PORT: z.coerce.number().default(4001),
  })
  .parse(process.env);

export const env = z
  .object({
    RESEND_API_KEY: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  })
  .parse(process.env);

// export const env = envSchema.parse(process.env);
