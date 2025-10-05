import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register", authController.getRegisterPage);

// router.get("/login", authController.getLoginPage);
// router.post("/login", authController.postLogin);

//* If the route is same than we can write in single line.
router
  .route("/register")
  .get(authController.getRegisterPage)
  .post(authController.postRegister);

router
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.postLogin);

export const authRoutes = router;
