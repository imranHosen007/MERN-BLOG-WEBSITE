import User from "../Models/User.Models.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../Utils/ErrorHandler.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: true,
          message: "forbidden user or token has expired",
        });
      }
      return decoded;
    }
  );

  req.user = await User.findById(decodedData.id);

  next();
};
