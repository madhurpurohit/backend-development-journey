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

router
  .route("/resend-verification-link")
  .post(authController.resendVerificationLink);

router.route("/verify-email-token").get(authController.verifyEmailToken);

router
  .route("/edit-profile")
  .get(authController.getEditProfilePage)
  .post(authController.postEditProfile);

router
  .route("/change-password")
  .get(authController.getChangePasswordPage)
  .post(authController.postChangePassword);

router
  .route("/reset-password")
  .get(authController.getForgotPasswordPage)
  .post(authController.postForgotPassword);

router
  .route("/reset-password/:token")
  .get(authController.getResetPasswordPage)
  .post(authController.postResetPassword);

router
  .route("/set-password")
  .get(authController.getSetPasswordPage)
  .post(authController.postSetPassword);

router.route("/google").get(authController.getGoogleLoginPage);
router.route("/google/callback").get(authController.getGoogleLoginCallback);

router.route("/github").get(authController.getGithubLoginPage);
router.route("/github/callback").get(authController.getGithubLoginCallback);

router.route("/logout").get(authController.logoutUser);

export const authRoutes = router;
