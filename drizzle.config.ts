import type { Config } from "drizzle-kit";
 
export default {
  schema: "./BD/schema.ts",
  out: "./BD/drizzle",
} satisfies Config;