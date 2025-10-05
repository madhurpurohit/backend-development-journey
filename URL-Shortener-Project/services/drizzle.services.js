import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinks } from "../drizzle/schema.js";

export const loadLinks = async () => {
  const links = await db.select().from(shortLinks);
  return links;
};

export const checkShortCode = async (finalShortCode) => {
  const isPresent = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortCode, finalShortCode));

  return isPresent;
};

export const addShortenerLinks = async ({ shortCode, url }) => {
  const addShortCode = await db.insert(shortLinks).values({
    shortCode,
    url,
  });
  // console.log(addShortCode);

  return addShortCode;
};
