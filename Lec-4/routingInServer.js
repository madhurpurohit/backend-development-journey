const http = require("http");

const server = http.createServer((req, res) => {
  // How to create routing server.
  if (req.url === "/") {
    res.end("Hello, Coders. This is home page");
  } else if (req.url === "/contact") {
    res.end("I am on contact page");
  } else if (req.url === "/about") {
    res.end("I am on about page");
  } else {
    res.end("Page Not Found.");
  }
});

server.listen(7800, () => {
  console.log("Server is running & you can access this.");
});
