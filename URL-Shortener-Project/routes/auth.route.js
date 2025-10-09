import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register", authController.getRegisterPage);
// router.get("/register", authController.postRegister);

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

router.route("/me").get(authController.getMe);

router.route("/profile").get(authController.getProfilePage);

router.route("/verify-email").get(authController.getVerifyEmailPage);

router.route("/logout").get(authController.logoutUser);

router
  .route("/resend-verification-link")
  .post(authController.resendVerificationLink);

export const authRoutes = router;
