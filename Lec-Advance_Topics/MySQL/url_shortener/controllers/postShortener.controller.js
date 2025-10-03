import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import {
  addShortenerLinks,
  checkShortCode,
  loadLinks,
} from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    const file = await fs.readFile(path.join("views", "index.html"));
    const links = await loadLinks();

    const content = file
      .toString()
      .replaceAll(
        "{{shortUrls}}",
        links
          .map(
            ({ shortCode, url }) =>
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
    const link = await checkShortCode(finalShortCode);

    if (link.length > 0) {
      return res.status(400).send("Short Code already taken");
    }

    addShortenerLinks({ shortCode: finalShortCode, url });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const linkShortener = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const links = await checkShortCode(shortcode);

    if (links.length === 0) {
      return res.status(404).send("Short Code not found");
    }

    return res.redirect(links[0].url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
