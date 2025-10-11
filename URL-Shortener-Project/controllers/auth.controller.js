//* EJS by default search in views folder.
import {
  authenticateUser,
  clearUserSession,
  clearVerifyEmailTokens,
  comparePassword,
  createResetPasswordLink,
  createUser,
  findUserByEmail,
  findUserById,
  findVerificationEmailToken,
  getAllShortLinks,
  // generateToken,
  getHashedPassword,
  getUserByEmail,
  sendNewVerifyEmailLink,
  updateUserByName,
  updateUserPassword,
  verifyUserEmailAndUpdate,
} from "../services/auth.services.js";
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
  verifyPasswordSchema,
  verifyUserSchema,
} from "../validation/auth.validation.js";
import { getHtmlFromMjmlTemplate } from "../lib/get-html-from-mjml-template.js";
import { sendMail } from "../lib/verify-email-using-resend.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("auth/register", { errors: req.flash("errors") });
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("../views/auth/login", { errors: req.flash("errors") });
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");

  //* How to Set Cookie in Normal Ways.
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");

  //* How to set cookie using cookie-parser.
  // res.cookie("isLoggedIn", true);
  // const { email, password } = req.body;

  //* Validate user input.
  const validateResult = loginUserSchema.safeParse(req.body);

  if (validateResult.success === false) {
    const errors = validateResult.error.issues[0].message;
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  const { email, password } = validateResult?.data;

  const user = await getUserByEmail(email);
  // console.log(userExists);

  if (!user) {
    req.flash("errors", "Invalid Email or Password");
    return res.redirect("/login");
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    req.flash("errors", "Invalid Email or Password");
    return res.redirect("/login");
  }

  // const token = generateToken({
  //   id: userExists.id,
  //   name: userExists.name,
  //   email: userExists.email,
  // });
  // res.cookie("access_token", token);

  await authenticateUser({ req, res, user });

  res.redirect("/");
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");

  // console.log(req.body);
  // const { name, email, password } = req.body;
  // console.log("Request Body: ", req.body);

  //* Validate user input.
  const validateResult = registerUserSchema.safeParse(req.body);
  // console.log("Result: ", validateResult);
  // console.log("Data: ", validateResult?.data);

  if (validateResult.success === false) {
    const errors = validateResult.error.issues[0].message;
    req.flash("errors", errors);
    return res.redirect("/register");
  }

  const { name, email, password } = validateResult?.data;

  const userExists = await getUserByEmail(email);
  // console.log(userExists);

  if (userExists) {
    req.flash("errors", "Email already exists");
    return res.redirect("/register");
  }

  const hashPassword = await getHashedPassword(password);

  const user = await createUser({ name, email, password: hashPassword });
  // console.log(user);

  // res.redirect("/login");
  await authenticateUser({ req, res, user, name, email });

  //* Send verification email after registration.
  await sendNewVerifyEmailLink({ email: email, userId: user.id });

  res.redirect("/");
};

//! Do you need to set path=/ while using cookieParser?
//* Cookie-Parser & Express automatically set the path to / by default.

//* Protected Route.
export const getMe = (req, res) => {
  if (!req.user) return res.redirect("/login");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const logoutUser = async (req, res) => {
  await clearUserSession(req.user.sessionId);

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.redirect("/login");
};

export const getProfilePage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const user = await findUserById(req.user.id);

  if (!user) return res.redirect("/login");

  const userShortLinks = await getAllShortLinks(user.id);

  return res.render("auth/profile", {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      createdAt: user.createdAt,
      links: userShortLinks,
    },
  });
};

export const getVerifyEmailPage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const user = await findUserById(req.user.id);

  if (!user || user.isEmailValid) return res.redirect("/login");

  return res.render("auth/verify-email", {
    email: req.user.email,
  });
};

export const resendVerificationLink = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const user = await findUserById(req.user.id);
  if (!user || user.isEmailValid) return res.redirect("/login");

  await sendNewVerifyEmailLink({ email: req.user.email, userId: req.user.id });

  res.redirect("/verify-email");
};

export const verifyEmailToken = async (req, res) => {
  const { data, error } = verifyEmailSchema.safeParse(req.query);

  if (error) return res.send("Verification link invalid or expired.");

  //* Find the token in the database and verify it is valid or not.
  // const token = await findVerificationEmailToken(data); // Without using Joins

  const [token] = await findVerificationEmailToken(data); // Using Joins

  if (!token) return res.send("Verification link invalid or expired.");

  //* Verify user email and update isEmailValid field.
  await verifyUserEmailAndUpdate(token.email);

  //* Delete the token from the database after verification.
  await clearVerifyEmailTokens(token.userId).catch(console.error);

  return res.redirect("/profile");
};

export const getEditProfilePage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const user = await findUserById(req.user.id);

  if (!user) return res.redirect("/login");

  return res.render("auth/edit-profile", {
    name: user.name,
    errors: req.flash("errors"),
  });
};

export const postEditProfile = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { data, error } = verifyUserSchema.safeParse(req.body);

  if (error) {
    const errorMessage = error.issues.map((err) => err.message);
    req.flash("errors", errorMessage);
    return res.redirect("/edit-profile");
  }

  await updateUserByName({ userId: req.user.id, name: data.name });

  return res.redirect("/profile");
};

export const getChangePasswordPage = (req, res) => {
  if (!req.user) return res.redirect("/login");

  return res.render("auth/change-password", {
    errors: req.flash("errors"),
  });
};

export const postChangePassword = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const { data, error } = verifyPasswordSchema.safeParse(req.body);

  if (error) {
    const errorMessage = error.issues.map((err) => err.message);
    req.flash("errors", errorMessage);
    return res.redirect("/change-password");
  }

  const user = await findUserById(req.user.id);

  if (!user) return res.redirect("/login");

  const isPasswordMatch = comparePassword(data.newPassword, user.password);

  if (!isPasswordMatch) {
    req.flash("errors", "Old Password that you entered is invalid");
    return res.redirect("/change-password");
  }

  await updateUserPassword({ userId: user.id, password: data.newPassword });

  return res.redirect("/profile");
};

export const getForgotPasswordPage = (req, res) => {
  return res.render("auth/forgot-password", {
    formSubmitted: req.flash("formSubmitted")[0],
    errors: req.flash("errors"),
  });
};

export const postForgotPassword = async (req, res) => {
  const { data, error } = forgotPasswordSchema.safeParse(req.body);

  if (error) {
    const errorMessage = error.issues.map((err) => err.message);
    req.flash("errors", errorMessage[0]);
    return res.redirect("reset-password");
  }

  const user = await findUserByEmail(data.email);

  if (user) {
    const createPasswordLink = await createResetPasswordLink({
      userId: user.id,
    });

    const html = await getHtmlFromMjmlTemplate("reset-password-email", {
      name: user.name,
      link: createPasswordLink,
    });

    sendMail({
      to: user.email,
      subject: "Reset Your Password",
      html,
    });

    req.flash("formSubmitted", true);
    return res.redirect("/reset-password");
  }

  req.flash("errors", "Email is not registered, or invalid.");
  return res.redirect("/reset-password");
};
