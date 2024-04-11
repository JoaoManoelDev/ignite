import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333)
})

const response = envSchema.safeParse(process.env)

if (!response.success) {
  console.error("Invalid environment variables.", response.error.format())
  throw new Error("Invalid environment variables.")
}

export const env = response.data
