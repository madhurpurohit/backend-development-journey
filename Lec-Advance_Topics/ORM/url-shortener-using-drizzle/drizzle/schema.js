import { int, varchar, mysqlTable } from "drizzle-orm/mysql-core";

export const shortLinks = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("shortCode", { length: 30 }).notNull().unique(),
  url: varchar("url", { length: 2555 }).notNull(),
});
