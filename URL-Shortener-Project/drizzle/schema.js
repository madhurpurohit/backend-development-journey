import { relations } from "drizzle-orm";
import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/mysql-core";

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

export const sessionTable = mysqlTable("sessions", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  valid: boolean("valid").default(true).notNull(),
  userAgent: text("user_agent"),
  ip: varchar("ip", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const userTable = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isEmailValid: boolean("is_email_valid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

//* A user can have many short links, so here one to many relationship is created.
export const userRelation = relations(userTable, ({ many }) => ({
  shortLinks: many(shortLinksTable),
  sessions: many(sessionTable),
}));

//* A short link belongs to a user, so here one to one relationship is created.
export const shortLinkRelation = relations(shortLinksTable, ({ one }) => ({
  users: one(userTable, {
    fields: [shortLinksTable.userId], // this is a foreign key
    references: [userTable.id], // this is a primary key
  }),
}));

//* A session belongs to a user, so here one to one relationship is created.
export const sessionRelation = relations(sessionTable, ({ one }) => ({
  users: one(userTable, {
    fields: [sessionTable.userId], // this is a foreign key
    references: [userTable.id], // this is a primary key
  }),
}));
