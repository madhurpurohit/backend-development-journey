import { int, varchar, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const shortLinks = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("shortCode", { length: 30 }).notNull().unique(),
  url: varchar("url", { length: 2555 }).notNull(),
});

export const userTable = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
