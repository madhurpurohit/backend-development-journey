//* EJS by default search in views folder.
import {
  authenticateUser,
  clearUserSession,
  comparePassword,
  createUser,
  findUserById,
  getAllShortLinks,
  // generateToken,
  getHashedPassword,
  getUserByEmail,
} from "../services/auth.services.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validation/auth.validation.js";

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
      createdAt: user.createdAt,
      links: userShortLinks,
    },
  });
};
