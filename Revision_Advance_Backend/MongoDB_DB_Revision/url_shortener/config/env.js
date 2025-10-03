import { z } from "zod";
import "dotenv/config";
console.log(process.env);

export const envSchema = z
  .object({
    PORT: z.coerce.number().default(4001),
    MONGO_URI: z.string(),
    DATABASE_NAME: z.string(),
  })
  .parse(process.env);

console.log(envSchema);
