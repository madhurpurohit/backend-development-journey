import { Router } from "express";
import {
  getShortenerPage,
  addShortener,
  linkShortener,
} from "../controllers/postShortener.controller.js";

const router = Router();

router.get("/", getShortenerPage);

router.post("/", addShortener);

router.get("/:shortcode", linkShortener);

export const shortenerRoutes = router;
