import express from "express";
import "dotenv/config";

const app = express();

//* Here we return because we want to show this on the page.
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/about", (req, res) => {
  return res.send(
    `<h1>I am Madhur Purohit aka DevFlux. I'm Full Stack Developer.</h1>`
  );
});

app.get("/contact", (req, res) => {
  return res.send(`<div id="container">
      <h1>URL Shortener</h1>
      <form id="shorten-form">
        <div class="input-div">
          <label for="url">Enter URL:</label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Enter URL Here"
            required
          />
        </div>
        <div class="input-div">
          <label for="shortCode">Enter Short Code:</label>
          <input
            type="text"
            name="shortCode"
            id="shortCode"
            placeholder="Enter Short Code Here"
            required
          />
        </div>
        <button type="submit">Shorten</button>
      </form>
    </div>`);
});

app.listen(Number(process.env.PORT), () => {
  console.log("Server is running on port no. 4000");
});
