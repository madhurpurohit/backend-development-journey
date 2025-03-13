//* How to import Express package?
//! Syntax:- const vName1 = require("express");

const express = require("express");

//* How to create server.
//! Syntax:- const vName = vName1(); Here in this callback function we give the response or take request.
//? It will return a object that's why we store it in any variable.

const app = express();

//* How to send or get reply/response?
//! Syntax:- vName.use(callbackFunction);
app.use((req, res) => {
  // res.send("Hello, Brother");

  // For sending data in JSON format.
  res.send({
    name: "Madhur Purohit",
    age: 24,
    money: 2450,
  });
});

//* On which Port No. we want to listen on server?
//! Syntax:- vName.listen(portNo, callbackFunction);
app.listen(4000, () => {
  console.log("Server is Running, & you can access this using localhost:4000");
});

//* How to host a server?
// So we can host on any hosting website or we can host on our system which is provided by Node.js.
// So to host on our system we have to write the below command on terminal & than search localhost:portNo on any browser, so it will show the response on the browser. Here localhost IP Address 127.0.0.0
//! Command:- node fileName // Here the fileName is where we wrote our server code.
//todo Example:- node server.js
