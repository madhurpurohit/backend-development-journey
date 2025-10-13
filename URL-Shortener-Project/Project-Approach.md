# Advance Topics or Approach of URL-Shortener-Project.

## Table Of Contents

0. [How to know user IP?](#0-how-to-know-user-ip)
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
18. [What is MJML?](#18-what-is-mjml)
19. [How to pass dynamic values to MJML & convert it to HTML?](#19-how-to-pass-dynamic-values-to-mjml--convert-it-to-html)
20. [What is Resend API?](#20-what-is-resend-api)
21. [How Resend API Works (A Simple Example)](#21-how-resend-api-works-a-simple-example)
22. [In Zod Validation what is refine method?](#22-in-zod-validation-what-is-refine-method)
23. [What are the steps on How to change password?](#23-what-are-the-steps-on-how-to-change-password)
24. [Steps on How to Post Forgot Password?](#24-steps-on-how-to-post-forgot-password)
25. [How to Reset Password?](#25-how-to-reset-password)
26. [How Login with Google or OAuth Works?](#26-how-login-with-google-or-oauth-works)
27. [What is CSRF Attacks?](#27-what-is-csrf-attacks)
28. [What is PKCE?](#28-what-is-pkce)
29. [What is Arctic & Code Part](#29-what-is-arctic)
30. []()

---

## 0. How to know user IP?

For this we use request-ip package.

1. Install it.

```js
npm i request-ip
```

[NPM Docs](https://www.npmjs.com/package/request-ip)

2. Use it.

```js
import requestIp from "request-ip";

app.use(requestIp.mw()); // This is a middleware function, which is used to get the user IP address.

console.log(req.ip); // So when we need user ip address then we can use req.ip.
```

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

#### How to install it?

[NPM Docs](https://www.npmjs.com/package/nodemailer)

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

[Official Docs](https://ethereal.email/)

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

## 18. What is MJML?

MJML, which stands for Mailjet Markup Language, is an open-source markup language designed specifically to make writing responsive emails easy.

Think of it as a modern framework (like React or Vue, but for emails) that abstracts away the complexities of old-school email HTML.

MJML provides a simple, clean, and component-based syntax. You write your email using easy-to-understand MJML components, and then the MJML engine compiles (or transpiles) your code into the complex, bulletproof HTML that works across all major email clients.

In short: You write simple code, and MJML generates the complicated-but-compatible code for you.

**What you write in MJML:**

```html
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Hello</mj-text>
      </mj-column>
      <mj-column>
        <mj-text>World</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

**What MJML generates (a small snippet):**

```html
<div style="margin:0px auto;max-width:600px;">
  <table
    align="center"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="width:100%;"
  >
    <tbody>
      <tr>
        <td
          style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"
        >
          <div
            class="mj-column-per-50 mj-outlook-group-fix"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="vertical-align:top;"
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    align="left"
                    style="font-size:0px;padding:10px 25px;word-break:break-word;"
                  >
                    <div
                      style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
                    >
                      Hello
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### How to install it?

[NPM Docs](https://www.npmjs.com/package/mjml)

[Official Docs](https://mjml.io/)

```bash
npm install mjml
```

---

## 19. How to pass dynamic values to MJML & convert it to HTML?

**index.mjml** Code:-

```js
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Hello <%= name %></mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

**index.js** Code:-

```js
import mjml2html from "mjml";
import fs from "fs/promises";
import path from "path";
import ejs from "ejs";

const name = "Sneha";

// 1. To get the file data using fs module, without "utf-8" it will give buffer/binary data, so to convert it to string we use "utf-8".
const data = await fs.readFile(
  path.join(import.meta.dirname, "index.mjml"),
  "utf-8"
);

// 2. How to use the EJS (Embedded JavaScript templating) library.
//    EJS provides a default 'render' method that replaces placeholders in the template content
//    with values from a data object. For example, it can replace <%= name %> with the value 'Sneha'
//    from the data object { name: 'Sneha' }.
//    - What does this method do: This method takes a file with template content and a data object,
//      and returns a new string with the dynamic data replaced.
//    - What does this method return: This method returns a new string with the dynamic data replaced.
const filledTemplate = ejs.render(data, {
  name,
});

// 3. To convert MJML to HTML
const html = mjml2html(filledTemplate).html;

console.log(html);
```

---

## 20. What is Resend API?

Resend is an email API platform designed for developers to easily send transactional and marketing emails from their applications. It's a modern alternative to older services like SendGrid or Mailgun, with a strong focus on developer experience, reliability, and integration with modern web frameworks like React.

Think of it as a specialized postal service for your app 📮. Instead of setting up your own complex mail servers, you just make a simple API call to Resend, and it handles the difficult work of ensuring your emails get delivered, tracked, and analyzed.

#### Key Features of Resend

1.  **Simple and Clean API**

    Resend provides a straightforward REST API. Sending an email is as simple as making a POST request with a JSON payload containing the sender, recipient, subject, and content. This makes it incredibly fast to integrate into any application.

2.  **React Email Integration**

    This is Resend's standout feature. They are the creators of React Email, an open-source library that allows you to build and style your email templates using React components. This is a game-changer because:

    - You can use familiar tools and a component-based workflow.

    - It handles the conversion of your React code into the messy, table-based HTML that is required for email client compatibility.

    - You can develop and preview your emails locally before sending.

3.  **High Deliverability**

    Resend is built on top of Amazon SES (Simple Email Service), which is known for its high deliverability rates. It also simplifies the process of setting up essential email authentication protocols like SPF, DKIM, and DMARC, which are crucial for preventing your emails from being marked as spam.

4.  **Webhooks and Analytics**

    You can set up webhooks to receive real-time notifications about the status of your emails, such as:

    - `deliver`

    - `opened`

    - `clicked`

    - `bounced`

    - `complained (marked as spam)`

This allows you to track user engagement and handle delivery issues programmatically. The dashboard also provides clean analytics to monitor your email performance.

**In Short:** **Resend** is a developer-first platform that modernizes email sending, making it simpler, more reliable, and better integrated with contemporary development workflows, especially within the React ecosystem.

#### How to install it?

[NPM Docs](https://www.npmjs.com/package/resend/v/6.0.0)

```bash
npm install resend
```

### How to get API key?

1. Login to Resend. [Open Link](https://resend.com/)

2. Click on "API Keys" in the sidebar.

3. Click on "Create API Key" button.

4. Copy the generated API key.

**NOTE:** If we don't have a Domain or Subdomain, than we can only send emails to a single email address, which we use to login to Resend, means we can't use this API key to send emails to multiple users. When we set Domain or Subdomain, then we can use this API key to send emails to multiple users.

---

## 21. How Resend API Works (A Simple Example)

Here's a basic example of how you might send an email using the Resend Node.js SDK:

```js
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend("your_api_key");

async function sendWelcomeEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Your App <onboarding@yourdomain.com>",
      to: ["newuser@example.com"],
      subject: "Welcome aboard!",
      html: "<strong>Thanks for signing up!</strong>",
      // Or use a React Email template
      // react: <WelcomeEmailTemplate userName="Alex" />
    });

    if (error) {
      return console.error({ error });
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error(error);
  }
}

sendWelcomeEmail();
```

---

## 22. In Zod Validation what is refine method?

.refine(callbackFunction), this will check the value of the email if it doesn't end with @gmail.com than it will throw an error. This error message will be shown to user. In this we can also pass path:[], if we want to show error message at specific path.

```js
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),
});
```

---

## 23. What are the steps on How to change password?

1. **Render Change Password Page**

   - If the user is not logged in, redirect them to the home page (/).

   - Otherwise, render the change password form with any flash error messages.

2. **Handle Change Password Request**

   - Check if the user is logged in; if not, redirect to (/).

   - Validate the request body using verifyPasswordSchema.safeParse(req.body).

   - If validation fails, store the first error message in flash and redirect back to /change-password.

3. **Verify User and Password**

   - Find the user by their ID.

   - If the user does not exist, show an error and redirect.

   - Compare the provided current password with the stored password.

If the current password is incorrect, show an error and redirect.

4. **Update the Password**

   - If everything is correct, update the user's password with the new password.

   - Redirect the user to their profile page (/profile).

---

## 24. Steps on How to Post Forgot Password?

1. **User enters email** on the Forgot Password page and submits the form.

2. **Validate the email input**

   - If the email is invalid, show an error and redirect back to the Forgot Password page.

3. **Check if the user exists** in the database using their email.

   - If the user **does exist:**

     - Generate a **reset password link**.

     - Create an **email template** with the reset link.

     - **Send an email** to the user with the reset link.

4. **Show a success message** and redirect back to the Forgot Password page.

   - Now, the user can check their email and reset their password using the link.

---

## 25. How to Reset Password?

1. Extract password reset token from request parameters.

2. Validate token authenticity, expiration, and match with a previously issued token.

3. If valid, get new password from request body and validate using a schema (e.g., Zod) for complexity.

4. Identify user ID linked to the token.

5. Invalidate all existing reset tokens for that user ID.

6. Hash the new password with a secure algorithm .

7. Update the user's password in the database with the hashed version.

8. Redirect to login page or return a success response.

---

## 26. How Login with Google or OAuth Works?

1.  For this we have do one things that is **Initial Setup**:

    - Register app with OAuth provider to get Client ID, and Client Secret.

      - The **OAuth Client ID** is a unique identifier issued by Google when we register our app on the Google Cloud Console. It tells Google: "Hey, I'm a legit app and I want to request to user info (like name, email) with the user's permission".

    - Configure authorized redirect URI: https://myapp.com/auth/callback

2.  **Authentication Flow**:

    - User clicks "Sign in with Google" button.

    - Frontend Request OAuth Login to Node.js Server.

    - Before it Redirects to OAuth Provider we have to do some task, For this we can use **Arctic library**:

      i. Generate random state parameter to prevent CSRF.

      ii. Generate code_verifier (random string 43-128 chars).

      iii. Compute code_challenge = base64URL(SHA256(code_verifier)).

      iv. Store state & code_verifier in cookies.

      v. Generate authorization URL using these information for our OAuth.

      vi. Redirect user to the authorized URL.

3.  **Redirect to Frontend Flow**:

    - It will return authorization URL.

      - **Example:** https://accounts.google.com/o/oauth2/v2/auth?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope= profile email&state=STATE&code_challenge=CODE_CHALLENGE&code_challenge_method=S256

4.  **5 calls back**:

    i. It arrives at provider login page.

    ii. It present Login Form & permission screen

    iii. Enters credentials & approves permissions.

    iv. It will redirect to callback URL with code & state

    - **Example:** https://myapp.com/auth/callback?code=CODE&state=STATE

    v. Now this code & state is send to server.

5.  **Communication b/w Server & OAuth Provider:**

    i. Verify state matches the state stored in cookies.

    ii. It will POST to token endpoint.

    - **Example:** https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=CLIENT_ID&code=CODE&code_verifier=(Original random string stored in cookie)

      Headers:

          Authorization: Basic base64(client_id:client_secret)

    iii. It will return tokens (access_token, refresh_token, expiration) to server.

    iv. Server request user data with access_token to OAuth Provider.

    v. OAuth Provider returns user profile information to server.

6.  **Get User Profile**:

    i. Create/update user account with profile data.

    ii. Link the user if needed.

    iii. Generate session for the user.

7.  Now server will return success response with session token to Frontend.

8.  Frontend will redirect to application dashboard.

#### Security Considerations

1. All communications use HTTPS.

2. Client secret & tokens stored securely.

3. State parameter validation prevents CSRF attacks.

4. PKCE (code_verifier/challenge) prevents authorization code interception.

---

## 27. What is CSRF Attacks?

A Cross-Site Request Forgery (CSRF) attack tricks an authenticated user into unknowingly submitting a malicious request to a web application. The primary prevention method is validating a unique state parameter for each session. PKCE (Proof Key for Code Exchange) is a security extension that prevents authorization code interception attacks, especially in public clients like mobile apps.

A CSRF attack (sometimes called a "one-click attack" or "session riding") is an exploit where an attacker tricks a logged-in user into executing an unwanted action on a web application. The application trusts the request because it comes from the user's browser with their valid session cookies, but the user did not intend to perform the action.

**Think of it like this:** You are logged into your online banking site. An attacker sends you an email with a link to a "cute cat picture." When you click the link, it loads the picture, but in the background, it also sends a hidden request to your bank's server to transfer money to the attacker's account. Your bank's server sees a valid request coming from your browser and processes it.

#### How a CSRF Attack Works in OAuth

In an OAuth context, a CSRF attack can trick a user into authorizing an attacker's account instead of their own.

1. **Attacker Initiates:** The attacker starts the OAuth login process for their own account on a malicious client application.

2. **Attacker Intercepts URL:** The authorization server redirects the attacker to the login page with a URL like `https://auth-server.com/auth?client_id=...&state=ATTACKER_STATE`. The attacker copies this URL.

3. **Victim is Tricked:** The attacker embeds this malicious URL in an innocent-looking link or image and sends it to the victim (e.g., via email or a chat message).

4. **Victim Clicks:** The victim, who is already logged into their account on the authorization server (like Google or Facebook), clicks the link.

5. **Malicious Authorization:** The victim's browser follows the URL. Since they are already logged in, the authorization server grants access and sends an authorization code back to the attacker's application. The victim has now unknowingly linked their session on the client application to the attacker's account on the authorization server.

#### How to Prevent CSRF Attacks

The most common prevention is using the state parameter, as you mentioned.

1. **Generate a Unique State:** When the legitimate application starts the OAuth flow, it must generate a unique, unguessable, and random string. This is the `state` parameter.

2. **Store the State:** The application stores this `state` value in the user's session storage (e.g., a server-side session or a secure, HTTP-only cookie).

3. **Send the State**: The application includes this `state` parameter in the authorization request URL sent to the authorization server.

4. **Receive and Verify:** After the user authorizes the request, the authorization server sends the `state` parameter back to the application along with the authorization code. The application must then compare the `state` value it received with the value it stored in the user's session.

   - If they match, the request is legitimate, and the flow can continue.

   - If they do not match, the request is likely a CSRF attack, and the application must reject it.

---

## 28. What is PKCE?

PKCE (pronounced "pixy") is a security extension for the OAuth 2.0 authorization code flow. Its purpose is to prevent authorization code interception attacks.

This attack is a risk for public clients like native mobile apps and single-page web applications (SPAs) because they cannot securely store a client_secret. An attacker on the same device could potentially intercept the authorization code as it's returned to the app and use it to get an access token.

#### How PKCE Works

PKCE adds a dynamic, one-time secret to the flow that proves the same client that started the request is the one completing it.

1. **Client Creates a Verifier:** Before starting the flow, your application creates a cryptographically random string called the `code_verifier`.

2. **Client Creates a Challenge:** The application then creates a transformed version of the verifier called the `code_challenge`. This transformation is typically a SHA256 hash.

3. **Authorization Request:** The application sends the `code_challenge` and the transformation method (`code_challenge_method='S256'`) to the authorization server in the initial request. The server stores this challenge.

4. **Authorization Grant:** The user logs in and grants permission. The server sends back a temporary `authorization_code`.

5. **Token Request & Verification:** The application requests the access token by sending the `authorization_code` and the original, plain-text `code_verifier` it created in step 1.

6. **Server Validation:** The server hashes the `code_verifier` it just received using the same method (S256) and compares the result to the `code_challenge` it stored earlier.

   - If they match, the server knows the request is coming from the legitimate client and issues the access token.

   - If they do not match, the request is rejected.

Even if an attacker intercepts the `authorization_code` in transit, it's useless to them because they do not have the original `code_verifier` secret needed to exchange it for an access token.

---

## 29. What is Arctic?

Arctic is a collection of OAuth 2.0 clients for popular providers. Only the authorization code flow is supported. Built on top of the Fetch API, it's light weight, fully-typed, and runtime-agnostic.

#### Code Part (getGoogleLoginPage)

```js
import { generateState, generateCodeVerifier } from "arctic";
import { google } from "../lib/auth/google.js";

// Generate random state
const state = generateState();

// Generate code_verifier (random string 43-128 chars)
const codeVerifier = generateCodeVerifier();

// Create authorization URL
const url = google.createAuthorizationUrl(state, codeVerifier, [
  "openid", // this is called scopes, here we are giving openid, and profile
  "profile", // openid gives tokens if needed, and profile gives user information
  // we are telling google about the information that we require from user.
  "email",
]);
```

## What's happening in above Code?

We're telling Google, "Here is my app's Client ID, & here's the kind of information I want from the user. Please show the login screen.

**openid** is part of the OpenID Connect Protocol, which is built on top of OAuth 2.0.

#### Why do we use it?

If we include the openid scope, it tells Google:

"Hey, I want the user's identity! Give me an ID token that proves who they are."

This token (called the ID Token) will contain. User's Google ID (a unique number). Email, Name, Profile Picture, And more...

Without openid, we don't get ID token (only access token).

**After that, this below code will come:**

```js
const AUTH_EXCHANGE_EXPIRY = 10 * 60 * 1000; // 10 minutes

const cookieConfig = {
  httpOnly: true,
  secure: true,
  maxAge: OAUTH_EXCHANGE_EXPIRY,
  sameSite: "lax", // This is such that when Google redirects to our website, cookies are maintained.
};

res.cookies("google_auth_state", state, cookieConfig);
res.cookies("google_code_verifier", codeVerifier, cookieConfig);

res.redirect(url.toString());
```

Go to lib folder & create auth folder inside this create google.js file & paste the below code:

```js
import { Google } from "arctic";
import { env } from "../config/env.js";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4000/google/callback" // We will create this route to verify after login.
);
```

**BreakDown:**

1. env.GOOGLE_CLIENT_ID: This is our app's public ID that we get from Google Cloud Console. It tells Google which app is trying to login.

2. env.,GOOGLE_CLIENT_SECRET: This is our app's secret key that should be kept private. It's used in the backend to prove that the login request is legit & secure.

3. "http://localhost:4000/google/callback" : This is called the Redirect URI. Super Important!

After a user logs in successfully whit Google, Google will send them (and a special code) to this URL.

**env.js File**

```js
import {z} from "zod;

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

#### Code Part (getGoogleLoginCallback)

```js
import { google } from "../lib/auth/google.js";
import { validateAuthorizationCode, decodeIdToken } from "arctic";

export const getGoogleLoginCallback = async (req, res) => {
  // Google redirects with code, and state in query params. We will use code to find out the user.
  const { code, state } = req.query;

  const { google_code_verifier: codeVerifier, google_auth_state: storedState } =
    req.cookies;

  if (
    !code ||
    !state ||
    !codeVerifier ||
    !storedState ||
    state !== storedState
  ) {
    req.flash(
      "errors",
      "Couldn't login with Google because of invalid login attempt. Please try again!"
    );
    return res.redirect("/login");
  }

  let token;
  try {
    // Arctic will verify the code given by Google with code verifier internally.
    token = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (error) {
    req.flash(
      "errors",
      "Couldn't login with Google because of invalid login attempt. Please try again!"
    );
    return res.redirect("/login");
  }

  const claim = decodeIdToken(token.idToken());
  const { sub: googleUserId, name, email } = claim;

  // There are few things that we should do.
  // Condition 1: User already exists with Google's OAuth linked.
  // Condition 2: User already exists with the same email but Google's OAuth isn't linked.
  // Condition 3: User doesn't exist.

  // If user is already linked than we will get the user.
  let user = await getUserWithOauthId({
    provider: "google",
    email,
  });

  // if user exists but user is not linked with oauth
  if (user && !user.providerAccountId) {
    await linkUserWithOauth({
      userId: user.id,
      provider: "google",
      providerAccountId: googleUserId,
    });
  }

  // if user doesn't exist
  if (!user) {
    user = await createUserWithOauth({
      name,
      email,
      provider: "google",
      providerAccountId: googleUserId,
    });
  }
  await authenticateUser({ req, res, user, name, email });

  res.redirect("/");
};
```

#### Code Part (auth.service.js) [getUserWithOauthId, linkUserWithOauth, createUserWithOauth]

```js
export async function getUserWithOauthId({ email, provider }) {
  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      isEmailValid: usersTable.isEmailValid,
      providerAccountId: oauthAccountsTable.providerAccountId,
      provider: oauthAccountsTable.provider,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .leftJoin(
      oauthAccountsTable,
      and(
        eq(oauthAccountsTable.provider, provider),
        eq(oauthAccountsTable.userId, usersTable.id)
      )
    );

  return user;
}

export async function linkUserWithOauth({
  userId,
  provider,
  providerAccountId,
}) {
  await db.insert(oauthAccountsTable).values({
    userId,
    provider,
    providerAccountId,
  });
}

export async function createUserWithOauth({
  name,
  email,
  provider,
  providerAccountId,
}) {
  const user = await db.transaction(async (trx) => {
    const [user] = await trx
      .insert(usersTable)
      .values({
        email,
        name,
        // password: "",
        isEmailValid: true, // we know that google's email are valid
      })
      .$returningId();

    await trx.insert(oauthAccountsTable).values({
      provider,
      providerAccountId,
      userId: user.id,
    });

    return {
      id: user.id,
      name,
      email,
      isEmailValid: true, // not necessary
      provider,
      providerAccountId,
    };
  });

  return user;
}
```

Here We get an error for password field, because if the user login first time or login with Google, than we register user on userTable & oAuthTable. So, if we do login with Google than no problem, but if user manually login than problem occur. So to prevent this we go to schema.js & userTable & remove .notNull() from password field. Than this will didn't give any error.

& than we go to postLoginPage function in auth.controller.js & add the below code before comparePassword.

```js
if (!user.password) {
  // database hash password
  // if password is null
  req.flash(
    "errors",
    "You have created account using social login. Please login with your social account."
  );
  res.redirect("/login");
}
```

---

## 30. How to implement Login with GitHub?

In this we will also register user with GitHub to get OAuth provider or Client ID.

**For That:**

1. Login our GitHub account. & than go to settings.

2. Inside settings go to Developer Settings.

3. Inside Developer Settings go to OAuth Apps.

4. Click on New OAuth App.

5. Give the name to your app & Homepage URL. Application Description is optional.

6. Enter Authorization Callback URL, This is same like Google /google/callback. This will same /github/callback.

7. Create on Register button.

8. Than we will get Client ID, & for Client Secret we will firstly generate it for this we have to click on Generate a new Client.

9. Than we will get Client Secret. So copy this because it will show only the first time after that we want see this.

---
