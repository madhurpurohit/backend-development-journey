const http = require("http");

//web server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1> I am Madhur Purohit aka DevFlux. I'm Full Stack Developer. </h1>");
    res.end();
  }

  if (req.url === "/source-code") {
    res.write(
      "Happy Diwali 🎉 Are you looking for high-quality, ready-to-use website source code? Look no further! Our collection of more than 10+ projects & websites has everything you need to get started on your next project. "
    );
    res.end();
  }

  if (req.url === "/contact") {
    res.setHeader("Content-Type", "text/plain");
    res.write("Have a Project or want to Collaborate? whatsapp now");
    res.end();
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🔥 Listening on PORT ${PORT}`);
});
