const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

const server = http.createServer(app);
const io = new Server(server);

//* To server HTML file from backend.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  // socket.on("message", (data) => {
  //   // io.emit("new-message", data); // This will send message to all users including us also.
  //   socket.broadcast.emit("new-message", data);
  // });

  socket.on("message", ({ room, msg }) => {
    socket.to(room).emit("new-message", msg);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port no. 4000");
});
