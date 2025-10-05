//* EJS by default search in views folder.
import {
  comparePassword,
  createUser,
  generateToken,
  getHashedPassword,
  getUserByEmail,
} from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("auth/register");
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("../views/auth/login");
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");

  //* How to Set Cookie in Normal Ways.
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");

  //* How to set cookie using cookie-parser.
  // res.cookie("isLoggedIn", true);
  const { email, password } = req.body;

  const userExists = await getUserByEmail(email);
  // console.log(userExists);

  if (!userExists) {
    return res.status(500).send("User does not exist");
  }

  const isPasswordMatch = await comparePassword(password, userExists.password);

  if (!isPasswordMatch) {
    return res.status(500).send("Password does not match");
  }

  const token = generateToken({
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
  });

  res.cookie("access_token", token);
  res.redirect("/");
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");

  // console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await getUserByEmail(email);
  // console.log(userExists);

  if (userExists) {
    return res.status(500).send("User already exists");
  }

  const hashPassword = await getHashedPassword(password);

  const user = await createUser({ name, email, password: hashPassword });
  // console.log(user);

  res.redirect("/login");
};

//! Do you need to set path=/ while using cookieParser?
//* Cookie-Parser & Express automatically set the path to / by default.

//* Protected Route.
export const getMe = (req, res) => {
  if (!req.user) return res.redirect("/login");
  return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);
};

export const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};
