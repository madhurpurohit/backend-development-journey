const express = require("express");
const app = express();

//* Import socket library.
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app); // Create a normal HTTP express server.

//* Connect/Upgrade this normal server into WebSocket.
const io = new Server(server);

//* How to establish connection.
io.on("connection", (socket) => {
  //* How to broadcast message to all connected user in once like group.
  socket.on("message", (data) => {
    io.emit("new-message", data);
  });

  //* How to disconnect one socket.
  socket.on("disconnect", () => {
    console.log("Disconnect Successfully.");
  });
});

server.listen(4000, () => {
  console.log("Sever is running on port no. 4000");
});

//! In this io means all user, & socket means only one user.

//! Not make like this given below, because sometime it happens that server is listening but socket connection is not establish.
/* 
*    const express = require("express");
*    const app = express();
*    const {Server} = require("socket.io");
    
*    const server = app.listen(4000, ()=>{
*       console.log("Running");
*    })

*    const io = new Server(server);
*/
