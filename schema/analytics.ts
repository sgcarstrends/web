import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const analyticsTable = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  pathname: text("pathname").notNull(),
  referrer: text("referrer").notNull(),
  flag: text("flag").notNull(),
  country: text("country").notNull(),
});

export type InsertAnalytics = typeof analyticsTable.$inferInsert;
export type SelectAnalytics = typeof analyticsTable.$inferSelect;
