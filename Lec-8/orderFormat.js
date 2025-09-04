const express = require("express");
const app = express();

/* There are multiple ways to write route handlers.
? 1. app.use(route, routeHandler1, routeHandler2, routeHandler3, routeHandler4);
? 2. app.use(route, [routeHandler1, routeHandler2, routeHandler3, routeHandler4]);
? 3. app.use(route, routeHandler1, [routeHandler2, routeHandler3], routeHandler4);
? 4. app.use(route, routeHandler1); app.use(route, routeHandler2); app.use(route, routeHandler3); app.use(route, routeHandler4);)
*/

//todo When we have multiple route handlers than we don't write res.send() in every callback function. Because response will be send only one time. So we prefer to write res.send() in the last callback function.

//! res.send() will send the response to the client. It is not act like return statement instead it is just like console.log() or simple line code.

app.use(
  "/user",
  (req, res, next) => {
    console.log("First");
    next(); // This will call the next middleware or route handler.
    console.log("Seventh");
  },
  (req, res, next) => {
    console.log("Second");
    next();
    console.log("Sixth");
  },
  (req, res, next) => {
    console.log("Third");
    next();
    console.log("Fifth");
  },
  (req, res) => {
    console.log("Fourth");
    res.send("Request handler called");
  }
);

app.listen(4800, () => {
  console.log("Server is running on port no. 4800");
});
