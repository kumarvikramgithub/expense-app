import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const userExist = async (req, res, next) => {
  const { name, email, password, isLogin } = req.body;
  if (
    (!isLogin && (!name || !email || !password)) ||
    (isLogin && (!email || !password))
  ) {
    res.status(400).json({
      error: `Status 400: Bad Request | Empty request body`,
      isLogin: isLogin,
    });
  }

  const user = await User.findOne({ email: email });
  if (user && isLogin) {
    console.log("if block");
    req.body = { user: user._doc, isLogin, password: password };
    next();
  } else if (user) {
    console.log("Exist user");
    res.status(400).json({
      error: `Status 400: Bad Request | User already exist.`,
    });
  } else {
    console.log("elase block");
    next();
  }
};

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    const userId = decodedToken.userkey;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      req.userId = userId;
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized Access, " + err,
    });
  }
};
