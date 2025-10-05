//* EJS by default search in views folder.

export const getRegisterPage = (req, res) => {
  res.render("auth/register");
};

export const getLoginPage = (req, res) => {
  res.render("../views/auth/login");
};

export const postLogin = (req, res) => {
  //* How to Set Cookie in Normal Ways.
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");

  //* How to set cookie using cookie-parser.
  res.cookie("isLoggedIn", true);

  res.redirect("/");
};

//! Do you need to set path=/ while using cookieParser?
//* Cookie-Parser & Express automatically set the path to / by default.
