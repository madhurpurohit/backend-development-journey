# Extra Advance Topics

## What is connect-flash & express-session npm package, & why we use it?

The connect-flash module relies on express-session to function properly. Flash messages are temporarily stored in the session & then displayed to the user on the next request, then cleared automatically. This is why we need both packages.

**Installing:-**

```bash
npm i express-session
npm i connect-flash
```

---

## How to make session using express-session?

```js
import session from "express-session";

app.use(
  session({ secret: "Secret_Key", resave: true, saveUninitialized: false })
);
```

In this resave means in each request we want to save this. & savUninitialized means if our session is empty than don't save it otherwise save it on every request.

---

## How to flash message using connect-flash?

**Syntax:**

```js
req.flash("key", "Value");
```

**Example:**

```js
req.flash("errors", "User already exists");
```

---

## How to get flash message?

**Syntax:**

```js
ree.flash("key");
```

**Example:**

```js
req.flash("errors");
```

---
