import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userTable } from "../drizzle/schema.js";
import bcrypt from "bcrypt";

export const getUserByEmail = async (email) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  return user;
};

export const createUser = async ({ name, email, password }) => {
  const [user] = await db
    .insert(userTable)
    .values({ name, email, password })
    .$returningId();

  return user;
};

export const getHashedPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
