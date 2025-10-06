import { relations } from "drizzle-orm";
import { int, varchar, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const shortLinksTable = mysqlTable("shortLinks", {
  id: int("id").primaryKey().autoincrement(),
  shortCode: varchar("shortCode", { length: 30 }).notNull().unique(),
  url: varchar("url", { length: 2555 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const userTable = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

//* A user can have many short links, so here one to many relationship is created.
export const userRelation = relations(userTable, ({ many }) => ({
  shortLinks: many(shortLinksTable),
}));

//* A short link belongs to a user, so here one to one relationship is created.
export const shortLinkRelation = relations(shortLinksTable, ({ one }) => ({
  users: one(userTable, {
    fields: [shortLinksTable.userId], // this is a foreign key
    references: [userTable.id], // this is a primary key
  }),
}));
