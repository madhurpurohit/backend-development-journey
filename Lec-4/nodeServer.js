//* How to import module for http server.
//! Syntax:- const vName1 = require("http");
const http = require("http");

//* How to create a server?
//! Syntax:- const vName = vName1.createServer( callbackFunction); Here in this callback function we give the response or take request.
//? It will return a object that's why we store it in any variable.
const server = http.createServer((req, res) => {
  res.end("Hello, Coders"); // It will return this response. When the client is ask or give any request so it will come by default in req.
});

//* On which Port No. we want to listen on server?
//! Syntax:- vName.listen(portNo, callbackFunction);
server.listen(4000, () => {
  console.log("I am listening at Port No. 4000");
});

//* How to host a server?
// So we can host on any hosting website or we can host on our system which is provided by Node.js.
// So to host on our system we have to write the below command on terminal & than search localhost:portNo on any browser, so it will show the response on the browser. Here localhost IP Address 127.0.0.0
//! Command:- node fileName // Here the fileName is where we wrote our server code.
//todo Example:- node server.js
