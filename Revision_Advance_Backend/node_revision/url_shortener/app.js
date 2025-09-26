import { createServer } from "http";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join("data", "links.json");

const serveFile = async (res, filePath, contentType) => {
  try {
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    console.log(error);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error 404, Page Not Found");
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    //* It means file is not existed or present in the folder. ENOENT stands for "no such file or directory".
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error; // This will throw error.
  }
};

const server = createServer(async (req, res) => {
  //   console.log(req.method, req.url);
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join("public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    } else {
      const links = await loadLinks();
      const shortCode = req.url.slice(1);
      console.log(shortCode);
      if (links[shortCode]) {
        res.writeHead(302, { Location: links[shortCode] }); // Here in location property what we write will be redirected to that page/link which we write.
        return res.end();
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Error 404, Page Not Found");
    }
  }

  if (req.method === "POST" && req.url === "/shorten") {
    const links = await loadLinks();

    let body = "";
    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      //   console.log(body);
      const { url, shortCode } = JSON.parse(body);

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is required");
      }

      if (!shortCode) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short Code is required");
      }

      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short Code already taken");
      }

      links[finalShortCode] = url;
      await writeFile(DATA_FILE, JSON.stringify(links));
      res.writeHead(200, { "Content-Type": "application/plain" });
      return res.end(finalShortCode);
    });
  }
});

server.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
