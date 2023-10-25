import type { Config } from "drizzle-kit";
require('dotenv').config();

 
export default {
  schema: "./BD/schema.js",
  out: "./BD/drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: `mysql://${process.env.MYSQL_USERNAME}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOSTNAME}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
  }
} satisfies Config;