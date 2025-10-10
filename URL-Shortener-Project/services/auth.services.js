import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "../config/db.js";
// import bcrypt from "bcrypt";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import ejs from "ejs";
import fs from "fs/promises";
import path from "path";
import mjml2html from "mjml";

import {
  sessionTable,
  shortLinksTable,
  userTable,
  verifyEmailTokensTable,
} from "../drizzle/schema.js";
import {
  ACCESS_TOKEN_EXPIRY,
  MILLISECONDS_PER_SECOND,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { sendMail } from "../lib/nodemailer.js";

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

// export const generateToken = ({ id, name, email }) => {
//   return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
//     expiresIn: "10m",
//   });
// };

export const createSession = async (userId, { ip, userAgent }) => {
  const [result] = await db
    .insert(sessionTable)
    .values({ userId, ip, userAgent })
    .$returningId();

  return result;
};

export const createAccessToken = ({ id, name, email, sessionId }) => {
  return jwt.sign({ id, name, email, sessionId }, process.env.SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const createRefreshToken = ({ sessionId }) => {
  return jwt.sign({ sessionId }, process.env.SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND,
  });
};

export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export const findSessionById = async (sessionId) => {
  const [session] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.id, sessionId));

  return session;
};

export const findUserById = async (userId) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId));

  return user;
};

//* How to re-generate access token using refresh token?
export const refreshTokens = async (refreshToken) => {
  try {
    const decodedToken = verifyJWTToken(refreshToken);
    const currentSession = await findSessionById(decodedToken.sessionId);

    if (!currentSession || !currentSession.valid) {
      throw new Error("Invalid Session");
    }

    const user = await findUserById(currentSession.userId);

    if (!user) {
      throw new Error("Invalid User");
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      sessionId: createSession.id,
    };

    const newAccessToken = createAccessToken(userInfo);

    const newRefreshToken = createRefreshToken({
      sessionId: currentSession.id,
    });

    return {
      newAccessToken,
      newRefreshToken,
      user: userInfo,
    };
  } catch (error) {
    console.error(error.message);
  }
};

export const clearUserSession = async (sessionId) => {
  return await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
};

export const authenticateUser = async ({ req, res, user, name, email }) => {
  const session = await createSession(user.id, {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = createAccessToken({
    id: user.id,
    name: user.name || name,
    email: user.email || email,
    isEmailValid: user.isEmailValid,
    sessionId: session.id,
  });

  const refreshToken = createRefreshToken({ sessionId: session.id });

  const baseConfig = { httpOnly: true, secure: true };

  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });
};

export const getAllShortLinks = async (userId) => {
  return await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.userId, userId));
};

export const generateRandomToken = (digit = 8) => {
  const min = 10 ** (digit - 1); // 10000000
  const max = 10 ** digit; // 100000000

  return crypto.randomInt(min, max).toString();
};

export const insertVerifyEmailToken = async ({ userId, token }) => {
  return db.transaction(async (tx) => {
    try {
      //* Delete any existing expired tokens.
      await tx
        .delete(verifyEmailTokensTable)
        .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

      //* Delete any existing tokens for the user.
      await tx
        .delete(verifyEmailTokensTable)
        .where(eq(verifyEmailTokensTable.userId, userId));

      //* Insert the new token.
      return await tx.insert(verifyEmailTokensTable).values({ userId, token });
    } catch (error) {
      console.error("Failed to insert verify email token", error);
      throw new Error("Unable to create verification token");
    }
  });
};

// export const createVerifyEmailLink = async ({ email, token }) => {
//   const urlEncodedEmail = encodeURIComponent(email);

//   return `${process.env.FRONTEND_URL}://verify-email-token?token=${token}&email=${urlEncodedEmail}`;
// };

export const createVerifyEmailLink = async ({ email, token }) => {
  //* Create the verify email link URL instance Using URL API
  const url = new URL(`${process.env.FRONTEND_URL}/verify-email-token`);

  //* Add the query parameters
  url.searchParams.append("token", token);
  url.searchParams.append("email", email);

  return url.toString();
};

//* Find the token in the database and verify it is valid or not. Without using Joins.
// export const findVerificationEmailToken = async ({ token, email }) => {
//   //* 1. Find the token in the database and check it is expired or not.
//   const tokenData = await db
//     .select({
//       userId: verifyEmailTokensTable.userId,
//       token: verifyEmailTokensTable.token,
//       expiresAt: verifyEmailTokensTable.expiresAt,
//     })
//     .from(verifyEmailTokensTable)
//     .where(
//       and(
//         eq(verifyEmailTokensTable.token, token),
//         gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
//       )
//     );

//   if (!tokenData.length) {
//     return null;
//   }

//   const { userId } = tokenData[0];

//   //* 2. Find the user by userId.
//   const userData = await db
//     .select({ userId: userTable.id, email: userTable.email })
//     .from(userTable)
//     .where(eq(userTable.id, userId));

//   if (!userData.length) {
//     return null;
//   }

//   return {
//     userId: userData[0].userId,
//     email: userData[0].email,
//     token: tokenData[0].token,
//     expiresAt: tokenData[0].expiresAt,
//   };
// };

//* Find the token in the database and verify it is valid or not. Using Joins.
export const findVerificationEmailToken = async ({ token, email }) => {
  return db
    .select({
      userId: userTable.id,
      email: userTable.email,
      token: verifyEmailTokensTable.token,
      expiresAt: verifyEmailTokensTable.expiresAt,
    })
    .from(verifyEmailTokensTable)
    .where(
      and(
        eq(verifyEmailTokensTable.token, token),
        eq(userTable.email, email),
        gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)
      )
    )
    .innerJoin(userTable, eq(verifyEmailTokensTable.userId, userTable.id));
};

export const verifyUserEmailAndUpdate = async (email) => {
  return await db
    .update(userTable)
    .set({ isEmailValid: true })
    .where(eq(userTable.email, email));
};

export const clearVerifyEmailTokens = async (userId) => {
  return await db
    .delete(verifyEmailTokensTable)
    .where(eq(verifyEmailTokensTable.userId, userId));
};

export const sendNewVerifyEmailLink = async ({ email, userId }) => {
  const randomToken = generateRandomToken();

  await insertVerifyEmailToken({ userId, token: randomToken });

  const verifyEmailLink = await createVerifyEmailLink({
    email,
    token: randomToken,
  });

  //todo 1. To get the file data using fs module, without "utf-8" it will give buffer/binary data, so to convert it to string we use "utf-8".
  const mjmlTemplate = await fs.readFile(
    path.join(import.meta.dirname, "..", "emails", "verify-email.mjml"),
    "utf-8"
  );

  //todo 2. How to use the EJS (Embedded JavaScript templating) library.
  //    EJS provides a default 'render' method that replaces placeholders in the template content
  //    with values from a data object. For example, it can replace <%= name %> with the value 'Sneha'
  //    from the data object { name: 'Sneha' }.
  //    - What does this method do: This method takes a file with template content and a data object,
  //      and returns a new string with the dynamic data replaced.
  const filledTemplate = ejs.render(mjmlTemplate, {
    code: randomToken,
    link: verifyEmailLink,
  });

  //todo 3. To convert the MJML to HTML
  const htmlOutput = mjml2html(filledTemplate).html;

  await sendMail({
    to: email,
    subject: "Verify your email",
    html: htmlOutput,
  });
};
