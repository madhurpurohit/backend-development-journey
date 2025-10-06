import crypto from "crypto";
import {
  addShortenerLinks,
  checkShortCode,
  loadLinks,
} from "../services/drizzle.services.js";

export const getShortenerPage = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const links = await loadLinks(req.user.id);

    //* How to get cookies in Normal Methods?
    // let isLoggedIn = req.headers.cookie;
    // isLoggedIn = Boolean(
    //   isLoggedIn
    //     ?.split(";")
    //     ?.find((cookie) => cookie.trim().startsWith("isLoggedIn"))
    //     ?.split("=")[1]
    // );

    //* How to get cookie while using cookie-parser?
    const { isLoggedIn } = req.cookies;

    return res.render("index", { links, host: res.host, isLoggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const addShortener = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const link = await checkShortCode(finalShortCode);

    if (link?.length > 0) {
      return res.status(400).send("Short Code already taken");
    }

    await addShortenerLinks({
      shortCode: finalShortCode,
      url,
      userId: req.user.id,
    });

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
