# What is Express.js?

🚀 Express.js is a framework built on top of Node.js to simplify backend development.

Express.js is a lightweight web framework for Node.js that simplifies building web servers and APIs. It provides routing, middleware support, and an easy way to handle HTTP requests. Unlike pure Node.js, Express makes server-side development faster and more efficient by reducing boilerplate code. It is widely used for creating REST APIs and full-stack applications.

## Key Difference between Node.js vs Express.js?

| Feature              | Node.js (Without Express)                                     | Express.js (With Node.js)                                                       |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Ease of Use          | Requires manual handling of requests, routing, and responses. | Provides built-in methods for handling routes and requests.                     |
| Routing              | Needs manual checking of req.url and req.method.              | Uses app.get(), app.post(), etc. for easy routing.                              |
| Middleware           | Requires custom functions for request handling.               | Supports built-in and third-party middleware like authentication, logging, etc. |
| JSON Handling        | Requires manual parsing of request data.                      | Built-in express.json() middleware for parsing JSON.                            |
| Code Complexity      | More boilerplate code.                                        | Cleaner and more structured code.                                               |
| Static File Serving  | Requires fs module to serve files.                            | express.static() to serve static files easily.                                  |
| Error Handling       | Must handle errors manually.                                  | Centralized error handling using middleware.                                    |
| Database Integration | Manual integration with MongoDB, MySQL, etc.                  | Seamless integration with mongoose, sequelize, etc.                             |
| Middleware Support   | No built-in middleware system.                                | Easily add middleware (e.g., express.json() for JSON parsing).                  |

# How to install Express.js?

1. We have to initialize npm for package.json file using:-

```
npm init
```

2. We have to install Express package using:-

```
npm install express
```

# How to use Express.js?

We have to get the express package firstly, for that:-

Syntax:-

```
const vName = require("express");
```

## How to create server?

Syntax:-

```
const vName1 = express();
```

- We have to listen this. For that:-

```
vName1.listen(portNo, callbackFunction);
```

## How to run server?

Syntax:-

```
node fileName
```

In this when we update or doing changes in our code than everytime we have restart the server which is not so convenient, so to automate this we installed NodeMon.

## How to install Nodemon?

- For installing in an individual project of folder.

```
npm install nodemon
```

- For installing nodemon to my entire system.

1. For MacOS or Windows.

```
sudo npm install -g nodemon
```

2. For Linux

```
npm install -g nodemon
```

## How to start server using Nodemon?

```
nodemon filename
```
