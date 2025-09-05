const auth = (req, res, next) => {
  // Authenticate the user that it is admin or not?. Authentication Middleware. Here we use dummy code not the actual logic.
  const token = "ABCDEF";
  const access = token === "ABCDEF";

  if (!access) {
    res.status(403).send("No Permission");
  } else {
    next();
  }
};

module.exports = { auth };
