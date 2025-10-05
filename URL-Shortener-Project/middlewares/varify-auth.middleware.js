import { verifyJWTToken } from "../services/auth.services.js";

export const verifyAuthentication = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;
  } catch (error) {
    res.user = null;
  }

  return next();
};

//! We can add any property to req. but:-

//* Avoid overwriting existing properties.
//* Use req.user for authentication.
//* Group custom properties under req.custom if needed. Here group means we can give data in the form of object.
//* Keep the data lightweight.
