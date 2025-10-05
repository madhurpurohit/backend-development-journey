//* EJS by default search in views folder.
import { compare } from "bcrypt";
import {
  comparePassword,
  createUser,
  getHashedPassword,
  getUserByEmail,
} from "../services/auth.services.js";
import { is } from "drizzle-orm";

export const getRegisterPage = (req, res) => {
  res.render("auth/register");
};

export const getLoginPage = (req, res) => {
  res.render("../views/auth/login");
};

export const postLogin = async (req, res) => {
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

  res.cookie("isLoggedIn", true);
  res.redirect("/");
};

export const postRegister = async (req, res) => {
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
