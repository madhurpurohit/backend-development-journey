import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";

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
