const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config();
console.log("PORT_NO from .env:", process.env.PORT_NO);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static("public"));

app.get("/ice-servers", (req, res) => {
  res.json({
    iceServers: [
      { urls: process.env.STUN_SERVER_ID },
      {
        urls: process.env.TURN_URLS,
        username: process.env.TURN_USERNAME,
        credential: process.env.TURN_CREDENTIAL,
      },
    ],
  });
});

// Socket.io signaling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Relay signaling data to other peer
  const relay = (event) => {
    socket.on(event, (data) => {
      socket.broadcast.emit(event, data);
    });
  };
  // Set up relay for WebRTC signals
  relay("offer");
  relay("answer");
  relay("candidate");

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(Number(process.env.PORT_NO), () => {
  console.log(`Server running on http://localhost:${process.env.PORT_NO}`);
});
