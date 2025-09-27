import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { DATA_FILE, loadLinks } from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    const file = await fs.readFile(path.join("views", "index.html"));
    const links = await loadLinks();

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
};

export const addShortener = async (req, res) => {
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
};

export const linkShortener = async (req, res) => {
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
};
