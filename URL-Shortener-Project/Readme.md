# Advance Topics or Approach of URL-Shortener-Project.

## Table Of Contents

1. [What is connect-flash & express-session npm package, & why we use it](#1-what-is-connect-flash--express-session-npm-package--why-we-use-it)
2. [How to make session using express-session](#2-how-to-make-session-using-express-session)
3. [How to flash message using connect-flash](#3-how-to-flash-message-using-connect-flash)
4. [How to get flash message](#4-how-to-get-flash-message)
5. [How to get User-Agent](#5-how-to-get-user-agent)
6. [Approach for refresh token](#6-approach-for-refreshing-token)

## 1. What is connect-flash & express-session npm package, & why we use it?

The connect-flash module relies on express-session to function properly. Flash messages are temporarily stored in the session & then displayed to the user on the next request, then cleared automatically. This is why we need both packages.

**Installing:-**

```bash
npm i express-session
npm i connect-flash
```

---

## 2. How to make session using express-session?

```js
import session from "express-session";

app.use(
  session({ secret: "Secret_Key", resave: true, saveUninitialized: false })
);
```

In this resave means in each request we want to save this. & savUninitialized means if our session is empty than don't save it otherwise save it on every request.

---

## 3. How to flash message using connect-flash?

**Syntax:**

```js
import flash from "connect-flash";
app.use(flash());

req.flash("key", "Value");
```

**Example:**

```js
req.flash("errors", "User already exists");
```

---

## 4. How to get flash message?

**Syntax:**

```js
req.flash("key");
```

**Example:**

```js
req.flash("errors");
```

---

## 5. How to get User-Agent?

**Definition:-** User Agent is a string that contains information about the client's browser, operating system, and other relevant details. e.g. "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36", it means the client is using Chrome browser on Windows 10.

The User-Agent is a header sent by the client's browser or application in an HTTP request. It provides about the device, operating system, browser version, and other information.

**Syntax:**

```js
req.headers["user-agent"];
```

---

## 6. Approach for refreshing token.

**Definition:-** When we refresh token, we need to send old refresh token to get new access token. So we need to store refresh token in cookie.

Step-by-Step Breakdown For Refreshing Token, which includes the file **services/auth.services.js**, **drizzle/schema.js** , **middleware/verify-auth-middleware.js**, **services/auth.services.js** and **auth.controller.js**

1. **Middleware:** verifyAuthentication

This function runs before any protected route is accessed. It checks if the user has a valid access token or a refresh token in their cookies.

**Process:**

- [x] Extract access_token and refresh_token from cookies.

- [x] If neither token exists, move to the next middleware (return next()).

- [x] If an access_token is present:

  - Try to decode and verify it using verifyJwtToken(accessToken).

  - If valid, attach the decoded user data (req.user = decodedToken) and move forward.

- If the access token is missing or invalid, check the refresh token:

  - Call refreshTokens(refreshToken) to generate a new access & refresh token.

  - Attach user data to req.user.

  - Store the new tokens in the user's cookies.

  - Proceed to the next middleware.

2. **Verifying JWT Token ( verifyJwtToken )**

This function ensures the token is valid and hasn't been tampered with.

**Process:**

- [x] Use jwt.verify(token, env.JWT_SECRET) to verify the token.

- [x] If the token is valid, return the decoded user information.

- [x] If invalid, an error will be thrown.

3. **Refreshing Tokens ( refreshTokens )**

When an access token expires, this function creates new tokens.

**Process:**

- [x] Decode the refresh token.

- [x] Fetch the session from the database (findSessionById(decodedToken.sessionId)).

- [x] If the session is invalid or expired, throw an error.

- [x] Fetch the user details (findUserById(currentSession.userId)).

- [x] If the user exists:

  - Create a new access token (createAccessToken(userInfo)).

  - Create a new refresh token (createRefreshToken(currentSession.id)).

  - Return both tokens and the user data.

- [x] If successful, the new tokens will be stored in the user's cookies for future authentication.

---
