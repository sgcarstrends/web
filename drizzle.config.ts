import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema/analytics.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
