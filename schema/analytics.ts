import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const analyticsTable = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  pathname: text("pathname").notNull(),
  referrer: text("referrer").notNull(),
  country: text("country").notNull(),
  flag: text("flag").notNull(),
  city: text("city").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
});

export type InsertAnalytics = typeof analyticsTable.$inferInsert;
export type SelectAnalytics = typeof analyticsTable.$inferSelect;
