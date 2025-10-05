import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userTable } from "../drizzle/schema.js";
// import bcrypt from "bcrypt";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
  //   return await bcrypt.hash(password, 12);
  return await argon2.hash(password);
};

export const comparePassword = async (password, hash) => {
  //   return await bcrypt.compare(password, hash);
  return await argon2.verify(hash, password);
};

export const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};
