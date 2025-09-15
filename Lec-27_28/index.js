const express = require("express");
require("dotenv").config();
const main = require("./chatAPI/aiChat");

const app = express();

app.use(express.json());

const chatHistory = {};

app.post("/chat", async (req, res) => {
  try {
    const { id, msg } = req.body;

    if (!chatHistory[id]) {
      chatHistory[id] = [];
    }
    const chat = chatHistory[id];

    const promptMsg = [
      ...chat,
      {
        role: "user",
        parts: [{ text: msg }],
      },
    ];

    const ans = await main(promptMsg);

    chat.push({ role: "user", parts: [{ text: msg }] });
    chat.push({ role: "model", parts: [{ text: ans }] });
    res.send(ans);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(parseInt(process.env.PORT), () => {
  console.log("Server is running on port no. 4000");
});
