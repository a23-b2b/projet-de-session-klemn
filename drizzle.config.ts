import type { Config } from "drizzle-kit";
 
export default {
  schema: "./BD/schema.js",
  out: "./BD/drizzle",
} satisfies Config;