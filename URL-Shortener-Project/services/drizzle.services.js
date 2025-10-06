import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";
import { error } from "console";

export const loadLinks = async (userId) => {
  const links = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.userId, userId));
  return links;
};

export const checkShortCode = async (finalShortCode) => {
  const isPresent = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.shortCode, finalShortCode));

  return isPresent;
};

export const addShortenerLinks = async ({ shortCode, url, userId }) => {
  const addShortCode = await db.insert(shortLinksTable).values({
    shortCode,
    url,
    userId,
  });
  // console.log(addShortCode);

  return addShortCode;
};

export const findShortLinkById = async (id) => {
  const [result] = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.id, id));

  return result;
};

export const updateShortCode = async ({ id, url, shortCode }) => {
  const [result] = await db
    .update(shortLinksTable)
    .set({ url, shortCode })
    .where(eq(shortLinksTable.id, id));

  return result;
};

export const deleteShortLinkById = async (id) => {
  return db.delete(shortLinksTable).where(eq(shortLinksTable.id, id));
};
