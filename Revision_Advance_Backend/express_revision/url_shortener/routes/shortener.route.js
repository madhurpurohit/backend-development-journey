/*
 * A router in Express.js is a tool to define modular & reusable routes in an application.
 * It is created using express.Router() to handle related rotes together.
 * Routers can be defined using methods like router.get() or router.post().
 * The router is mounted in the main app using app.use("/basepath", router);
 */

import path from "path";
import crypto from "crypto";
import fs from "fs/promises";
import { Router } from "express";

//* Create an instance of Router.
const router = Router();

//* Here we use ".." to go to the parent folder, which is url_shortener folder.
const DATA_FILE = path.join(import.meta.dirname, "..", "data", "links.json");

const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // console.log(data);
    return JSON.parse(data);
  } catch (error) {
    //* It means file is not existed or present in the folder. ENOENT stands for "no such file or directory".
    if (error.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error; // This will throw error.
  }
};

router.get("/", async (req, res) => {
  try {
    const file = await fs.readFile(path.join("views", "index.html"));
    const links = await loadLinks();
    // console.log(links);

    const content = file.toString().replaceAll(
      "{{shortUrls}}",
      Object.entries(links)
        .map(
          ([shortCode, url]) =>
            `<li><a href="/${shortCode}" target="_blank">${req.hostname}/${shortCode}</a> - ${url}</li>`
        )
        .join("")
    );

    return res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res.status(400).send("Short Code already taken");
    }

    links[finalShortCode] = url;
    await fs.writeFile(DATA_FILE, JSON.stringify(links));
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;
    const links = await loadLinks();

    if (!links[shortcode]) {
      return res.status(404).send("Short Code not found");
    }

    return res.redirect(links[shortcode]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//? Default export of router.
// export default router;

//? Named export of router.
export const shortenerRoutes = router;
