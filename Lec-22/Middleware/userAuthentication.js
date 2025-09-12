const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      throw new Error("Token is not valid, Please login again");
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(payload);
    if (!payload) {
      throw new Error("Please login again, payload");
    }

    const { email } = payload;
    // console.log(email);
    // console.log(req.body.email);
    if (!email) {
      throw new Error("Please login again, email");
    }

    if (req.body.email && email !== req.body.email) {
      throw new Error(
        "You're not the account owner, please login in your account"
      );
    }

    req.email = email;

    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = userAuth;
