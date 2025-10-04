/*
 * A router in Express.js is a tool to define modular & reusable routes in an application.
 * It is created using express.Router() to handle related rotes together.
 * Routers can be defined using methods like router.get() or router.post().
 * The router is mounted in the main app using app.use("/basepath", router);
 */

import { Router } from "express";
import {
  getShortenerPage,
  addShortener,
  linkShortener,
} from "../controllers/postShortener.controller.js";

//* Create an instance of Router.
const router = Router();

router.get("/", getShortenerPage);

router.post("/", addShortener);

router.get("/:shortcode", linkShortener);

//? Default export of router.
// export default router;

//? Named export of router.
export const shortenerRoutes = router;
