import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";

// export const verifyAuthentication = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     req.user = null;
//     return next();
//   }

//   try {
//     const decodedToken = verifyJWTToken(token);
//     req.user = decodedToken;
//   } catch (error) {
//     res.user = null;
//   }

//   return next();
// };

//! We can add any property to req. but:-

//* Avoid overwriting existing properties.
//* Use req.user for authentication.
//* Group custom properties under req.custom if needed. Here group means we can give data in the form of object.
//* Keep the data lightweight.

//* How to verify the authenticated user using access token or refresh token?
export const verifyAuthentication = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  req.user = null;

  if (!accessToken && !refreshToken) {
    return next();
  }

  if (accessToken) {
    const decodedToken = verifyJWTToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(
        refreshToken
      );

      req.user = user;

      const baseConfig = { httpOnly: true, secure: true };

      res.cookie("access_token", newAccessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.error(error);
    }
  }

  return next();
};
