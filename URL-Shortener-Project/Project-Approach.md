# Advance Topics or Approach of URL-Shortener-Project.

## Table Of Contents

1. [What is connect-flash & express-session npm package, & why we use it](#1-what-is-connect-flash--express-session-npm-package--why-we-use-it)
2. [How to make session using express-session](#2-how-to-make-session-using-express-session)
3. [How to flash message using connect-flash](#3-how-to-flash-message-using-connect-flash)
4. [How to get flash message](#4-how-to-get-flash-message)
5. [How to get User-Agent](#5-how-to-get-user-agent)
6. [Approach for refresh token](#6-approach-for-refreshing-token)
7. [How to use timestamp in drizzle for set an expiry date](#7-how-to-use-timestamp-in-drizzle-for-set-an-expiry-date-it-means-from-now-till-how-many-days-it-will-expire)
8. [Understanding references vs. relations in Drizzle ORM](#8-understanding-references-vs-relations-in-drizzle-orm)
9. [The Guiding Principle: When to Define relations](#9-the-guiding-principle-when-to-define-relations)
10. [What is Nodemailer](#10-what-is-nodemailer)
11. [What is Ethereal](#11-what-is-ethereal)
12. [Steps to Use Ethereal with Nodemailer](#12-steps-to-use-ethereal-with-nodemailer)
13. [Another way Use Ethereal with Nodemailer](#13-another-way-use-ethereal-with-nodemailer)
14. [What is Transaction in DBMS?](#14-what-is-transaction-in-dbms)
15. [How to use Transaction in DBMS?](#15-how-to-use-transaction-in-dbms)
16. [What is URL API](#16-what-is-url-api)
17. [What is Join in MySQL?](#17-what-is-join-in-mysql)
18. []()
19. []()
20. []()

---

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

## 7. How to use timestamp in drizzle for set an expiry date, it means from now till how many days it will expire?

For this brackets inside sql `` is necessary here, otherwise we will get syntax error.

```js
field: timestamp().default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`);
```

---

## 8. Understanding references vs. relations in Drizzle ORM

When defining table connections in Drizzle ORM, it's helpful to think of the process in two distinct parts: one that operates at the database level and another that serves your application code.

1. **references():** The Database-Level Rule

   - **What it is:** This function establishes a Foreign Key constraint in the database schema.

   - **Purpose:** Its primary role is to enforce referential integrity. It dictates that a value in one table's column must correspond to an existing value in another table's column, thereby preventing orphaned records and maintaining data consistency.

   - **Analogy:** Think of this as an official government record. It's a strict, non-negotiable rule enforced by the database system itself.

2. **relations():** The Application-Level Utility

   - **What it is:** This function defines the relationships between tables specifically for the Drizzle ORM layer in your application.

   - **Purpose:** It enables convenient and type-safe querying of related data. By defining relations, you instruct Drizzle on how to perform joins, allowing you to fetch a primary record along with its associated records (e.g., a user and all of their short links) in a single, efficient query. This practice is often called eager loading.

   - **Analogy:** Consider this your phone's contact list. You save a number under a name for your convenience to quickly find and call it. Similarly, relations provides a convenient shortcut for your code to "call" upon related data without writing complex manual joins.

- **In short:-**

  - **`references()`:** Enforces rules at the database level. It is fundamental for data integrity.

  - **`relations()`:** Provides convenience at the application level. It is optional and used to simplify type-safe queries that involve related data.

---

## 9. The Guiding Principle: When to Define relations

To decide whether you need to define a relation, ask yourself this simple question:

**Example:** "In my application, will I frequently need to query data from Table A and concurrently fetch its related data from Table B?"

- **If the answer is "Yes":**

  - **Example:** "I need to display a user's profile along with a list of all their generated short links."

  - **Action:** You should define a relation.

- **If the answer is "No":**

  - **Example:** "I will never need to fetch a user along with all of their email verification tokens. My use case is to query the token itself to find the associated user."

  - **Action:** A relation is likely unnecessary. The references() foreign key constraint is sufficient for ensuring database integrity.

---

## 10. What is Nodemailer?

Nodemailer is a popular, zero-dependency library for Node.js designed for sending emails. It's highly flexible and simplifies what can otherwise be a complex process.

**Key Features:**

- **Simple to Use:** It has a straightforward API for composing and sending messages.

- **Multiple Transports:** It can send emails using different services and protocols, most commonly SMTP (used by Gmail, Outlook, etc.), but also others like SendGrid or Amazon SES.

- **Rich Content:** You can easily send emails with HTML content, styled text, images, and attachments.

- **Secure:** It supports secure sending with TLS/SSL and authentication methods like OAuth2.

It's the tool you install in your project `npm install nodemailer` to handle the logic of creating and dispatching an email from your server.

---

## 11. What is Ethereal?

Ethereal is a free, "fake" SMTP service created by the same team behind Nodemailer. Its sole purpose is for testing and development.

**How it Works:**

1. You ask Ethereal to create a **temporary test email account**.

2. Ethereal gives you **SMTP credentials** (host, port, username, and password) that are valid for a short time.

3. You configure **Nodemailer** in your code to use these temporary credentials.

4. When your application sends an email using Nodemailer, it doesn't go to a real inbox. Instead, Ethereal's server **catches the email**.

5. Nodemailer then gives you a **preview URL** in your console. When you open this URL, you can see exactly how your email looks in a web-based inbox.

This is extremely useful because it lets you test your email-sending functionality perfectly—checking layouts, content, and attachments—without spamming real email accounts or needing to set up a dedicated development email server.

---

## 12. Steps to Use Ethereal with Nodemailer

1. Install Nodemailer: `npm install nodemailer`

2. Import Nodemailer: `const nodemailer = require("nodemailer");`

3. Generate a Testing Account: `nodemailer.createTestAccount((err, account) => { ... })`

4. Create a Transporter: `let transporter = nodemailer.createTransport({ ... })`

5. Send an Email: `transporter.sendMail({ ... })`

6. Preview the Email: `transporter.getTestMessageUrl({ ... })`

```js
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
})();
```

---

## 13. Another way Use Ethereal with Nodemailer

**Syntax:-**

```js
// Use at least Nodemailer v4.1.0
const nodemailer = require("nodemailer");

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error("Failed to create a testing account. " + err.message);
    return process.exit(1);
  }

  console.log("Credentials obtained, sending message...");

  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    host: account.smtp.host, // "smtp.ethereal.email", "smtp.gmail.com" etc.
    port: account.smtp.port, // 587 etc.
    secure: account.smtp.secure, // true for port 465, false for other ports.
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  // Message object
  let message = {
    from: "Sender Name <sender@example.com>", // sender address
    to: "Recipient <recipient@example.com>", // list of receivers
    subject: "Nodemailer is unicode friendly ✔", // Subject line
    text: "Hello to myself!", // plain text body
    html: "<p><b>Hello</b> to myself!</p>", // html body
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});
```

**Output:-**

```
Credentials obtained, sending message...
Message sent: <jBbHx@example.com>
Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
```

---

## 14. What is Transaction in DBMS?

A transaction is a sequence of one or more database operations (such as INSERT, DELETE, UPDATE) that are executed as a single unit of work. The entire sequence must either complete successfully (commit) or fail entirely (rollback), maintaining the database in a consistent state regardless of the outcome.

#### Why should we use Transaction?

1. **Ensure Data Integrity:** If one operation fails, the entire transaction is rolled back to prevent partial updates.

2. **Prevent Data Corruption:** Avoids inconsistent states due to system crashes or errors.

3. **Maintain Atomicity:** Ensures all operations succeed or none are applied.

4. **Handle Concurrent Request:** Prevents issue like race condition & dirty reads in multi-user environments.

5. **Rollback on Failure:** If any step fails, the database reverts to its previous state.

#### Where should we use Transaction?

- **User Authentication & Verification:** Ensuring email verification tokens are uniques and properly stored.

- **E-commerce Payments:** Updating inventory, processing payments, and confirming orders simultaneously.

- **Banking Systems:** Ensuring money is deducted from one account and credited to another account.

- **Booking & Reservation:** Preventing double bookings in flight/hotel reservation systems.

- **Batch Updates:** Performing multiple related updates in a single operation like bulk inserting records.

---

## 15. How to use Transaction in DBMS?

**Syntax:-**

```drizzle
import { sql } from "drizzle-orm";

const result = await db.transaction(async (tx) => {
  const result1 = await tx.query(sql`SELECT * FROM table1`);
  const result2 = await tx.query(sql`SELECT * FROM table2`);
  return { result1, result2 };
});
```

**Example:**

```drizzle
import { sql } from "drizzle-orm";

const result = await db.transaction(async (tx) => {
  try {
    await tx
    .delete(verifyEmailTokensTable)
    .where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`));

    return await tx.insert(verifyEmailTokensTable).values({ userId, token });
  } catch (error) {
    await tx.rollback(); // Rollback the transaction
    throw error;
  }
})
```

---

## 16. What is URL API?

The URL API in JavaScript provides an easy way to construct, manipulate, and parse URLs without manual string concatenation. It ensures correct encoding, readability, and security when handling URLs.

```js
const url = new URL("https://example.com/profile?id=42&theme=dark");

console.log(url.hostname); // "example.com"
console.log(url.pathname); // "/profile"
console.log(url.searchParams.get("id")); // "42"
console.log(url.searchParams.get("theme")); // "dark"
```

#### 💡 Why Use the URL API?

✅ Easier URL Construction – No need for manual ? and & handling.
✅ Automatic Encoding – Prevents issues with special characters.
✅ Better Readability – Clean and maintainable code.

**Definition:-** The URL API is a built-in web interface that provides tools to easily parse, construct, and modify URLs. It allows you to treat a URL as a structured object with distinct properties, making it much safer and more reliable than manually manipulating URL strings with regular expressions or string splitting. It is available in all modern web browsers and in Node.js.

#### Why Use the URL API?

Imagine you have this URL string: `https://www.example.com:8080/path/to/page?query=123&sort=asc#section-2`

Without the URL API, you would have to use complex string methods to extract the protocol (https), hostname (www.example.com), or query parameters (query=123). This is prone to errors.

The URL API simplifies this by converting the string into an object, where each part is a neatly accessible property.

```js
// Create a new URL object
const myUrl = new URL(
  "https://www.example.com:8080/path/to/page?query=123&sort=asc#section-2"
);
```

### Key Properties of the URL Object

Once you create a URL object, you can easily access its components:

- **`href`:** Returns the full URL string.

  - `myUrl.href` ➡️ `https://www.example.com:8080/path/to/page?query=123&sort=asc#section-2`

- **`protocol`:** Returns the protocol scheme of the URL, including the final ':'.

  - `myUrl.protocol` ➡️ `https:`

- **`hostname`:** Returns the domain name.

  - `myUrl.hostname` ➡️ `www.example.com`

- **`port`:** Returns the port number.

  - `myUrl.port` ➡️ `8080`

- **`pathname`:** Returns the path, which starts with a '/'.

  - `myUrl.pathname` ➡️ `/path/to/page`

- **`search`:** Returns the entire query string, starting with a '?'.

  - `myUrl.search` ➡️ `?query=123&sort=asc`

- **`hash`:** Returns the fragment identifier, starting with a '#'.

  - `myUrl.hash` ➡️ `#section-2`

#### Working with Query Parameters (searchParams)

One of the most powerful features of the URL API is the searchParams property. It returns a URLSearchParams object, which provides simple methods to read and modify the query string.

```js
// Using the 'myUrl' object from before
const params = myUrl.searchParams;

// Get a specific parameter
console.log(params.get("query")); // "123"

// Check if a parameter exists
console.log(params.has("sort")); // true

// Add a new parameter
params.append("newParam", "hello");

// The full URL is automatically updated!
console.log(myUrl.href);
// "https://www.example.com:8080/path/to/page?query=123&sort=asc&newParam=hello#section-2"
```

---

## 17. What is Join in MySQL?

Joins are used to combine rows from two or more tables based on a related column. When we need data from two (or more) tables in a **single query**, we use **JOINs**.

Commonly used joins in MySQL:

- INNER JOIN
- LEFT JOIN
- RIGHT JOIN

**Definition:** A MySQL JOIN is a clause used to combine rows from two or more tables based on a related column between them. JOINs are essential for querying data from a relational database where information is intentionally spread across multiple tables to avoid redundancy (a concept called normalization).

**Example:** Think of it like this: you have one table with customer information (Customers) and another with order details (Orders). Neither table by itself tells you which customer placed which order. A JOIN lets you link them together using a common field, like customer_id, to get a complete picture.

#### Why Use JOINs?

In database design, you separate data into different tables to keep it organized and efficient. For example:

    - **Customers Table:** customer_id, name, email

    - **Orders Table:** order_id, order_date, customer_id

If you wanted to find the name of the customer who placed a specific order, you would need to use a `JOIN` to connect these two tables on the customer_id column.

#### Common types of JOINs

1. **INNER JOIN:**

This is the most frequently used join. It returns only the rows where the key exists in both tables. If a customer has never placed an order, they will not appear in the result.

**Syntax:**

```js
SELECT Customers.name, Orders.order_date
FROM Customers
INNER JOIN Orders ON Customers.customer_id = Orders.customer_id;

// This query returns a list of customer names and their corresponding order dates for only those customers who have placed an order.
```

2. **LEFT JOIN (LEFT OUTER JOIN)**

A `LEFT JOIN` returns all rows from the left table (`Customers`), and the matched rows from the right table (`Orders`). If there is no match for a customer in the `Orders` table, the columns from `Orders` will contain `NULL`.

This is useful for finding things like "Show me all customers, and list their orders if they have any."

```js
SELECT Customers.name, Orders.order_date
FROM Customers
LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id;

```

This result will include all customers, even those with `NULL` in the `order_date` column because they haven't made any purchases.

3. **RIGHT JOIN (RIGHT OUTER JOIN)**

A `RIGHT JOIN` is the opposite of a `LEFT JOIN`. It returns all rows from the right table (`Orders`), and the matched rows from the left table (`Customers`). If an order somehow has a `customer_id` that doesn't exist in the `Customers` table, that order will still be listed with `NULL` for the customer's name.

```js
SELECT Customers.name, Orders.order_date
FROM Customers
RIGHT JOIN Orders ON Customers.customer_id = Orders.customer_id;
```

This is less common than `LEFT JOIN` but can be useful in specific scenarios.

4. **FULL OUTER JOIN**

A `FULL OUTER JOIN` combines the results of both `LEFT` and `RIGHT` JOINs. It returns all rows from both tables, with `NULL` values on either side where a match is not found.

Note: MySQL does not have a specific `FULL OUTER JOIN` keyword. You must emulate it by combining a `LEFT JOIN` and a `RIGHT JOIN` with the `UNION` operator.

```js
-- This is how you simulate a FULL OUTER JOIN in MySQL

SELECT Customers.name, Orders.order_date
FROM Customers
LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id
UNION
SELECT Customers.name, Orders.order_date
FROM Customers
RIGHT JOIN Orders ON Customers.customer_id = Orders.customer_id;
```

---

## 18. 



---


## 19. 



---


## 20. 



---