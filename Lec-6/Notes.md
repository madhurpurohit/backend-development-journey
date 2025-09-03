# Notes on Express.js

This file contains a summary of the key points from the files in this directory, as well as some extra beneficial knowledge about Express.js.

## Express.js Fundamentals (from `Intro-To-Express.md`)

- **What is Express.js?** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Why use Express.js over plain Node.js?** It simplifies development with features like routing, middleware, and request/response handling, reducing boilerplate code.
- **Installation:**
  - Initialize npm: `npm init`
  - Install Express: `npm install express` `npm install express@4.21.2`
- **Basic Usage:**
  - Import Express: `const express = require('express');`
  - Create an Express app: `const app = express();`
  - Listen for requests: `app.listen(port, callback);`
- **Nodemon:** A tool that automatically restarts the server on file changes.
  - Install globally: `npm install -g nodemon`
  - Run with Nodemon: `nodemon fileName.js`

## Basic Express Server (from `expressServer.js`)

This file demonstrates how to create a simple Express server that sends a JSON response to any incoming request.

```javascript
const express = require("express");
const app = express();

app.use((req, res) => {
  res.send({
    name: "Madhur Purohit",
    age: 24,
    money: 2450,
  });
});

app.listen(4000, () => {
  console.log("Server is Running, & you can access this using localhost:4000");
});
```

## Routing in Express

### Basic Routing (from `routingExpress.js`)

This file shows how to handle requests to different URLs using `app.use()`.

- `app.use('/about', ...)`: Handles requests to the `/about` path.
- `app.use('/contact', ...)`: Handles requests to the `/contact` path.
- `app.use('/', ...)`: Handles all other requests (acts as a fallback).

### Advanced Routing (from `routingExpress2.js`)

This file demonstrates more advanced routing patterns:

- **`?`:** Makes the preceding character optional. `/abou?t` matches `/about` and `/abot`.
- **`+`:** Matches one or more occurrences of the preceding character. `/conta+ct` matches `/contact`, `/contaact`, etc.
- **`*`:** Matches any sequence of characters. `/detail*s` matches `/details`, `/detail123s`, etc.
- **Route Parameters:** Uses colons to define parameters in the URL. In `/info/:id/:user`, the values for `id` and `user` are available in `req.params`.

## Extra Knowledge: Essential Express.js Concepts

Here are some additional topics that are crucial for building robust applications with Express.js:

### Middleware

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. The `next` function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

**Common Middleware:**

- `express.json()`: Parses incoming requests with JSON payloads.
- `express.urlencoded({ extended: true })`: Parses incoming requests with URL-encoded payloads.
- `express.static('public')`: Serves static files (like images, CSS, and JavaScript) from a directory.

### Template Engines

Template engines allow you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client.

**Popular Template Engines:**

- **EJS (Embedded JavaScript):** Simple and powerful.
- **Pug (formerly Jade):** Uses indentation for syntax, which can be cleaner for some developers.
- **Handlebars:** Logic-less templates.

### REST APIs

Express.js is widely used for creating RESTful APIs. A REST API defines a set of functions which developers can perform requests and receive responses via HTTP protocol such as GET, POST, PUT, and DELETE.

**Example of a simple REST API:**

```javascript
const express = require("express");
const app = express();
app.use(express.json());

let users = [{ id: 1, name: "John Doe" }];

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET a single user
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found.");
  res.json(user);
});

// CREATE a new user
app.post("/api/users", (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.status(201).json(user);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
```

### Error Handling

**Learning Points:**

- **Params:** Send parameters with a GET request using the params tab.
- **Headers:** Send headers with a request using the headers tab.
- **Body:** Send request bodies with a POST request using the body tab.
- **Pre-request Scripts:** Write code to run before a request is sent, such as generating a random number or setting a token.
- **Tests:** Write code to run after a request is sent, such as checking the status code or response body.
