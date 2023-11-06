import jwt from "jsonwebtoken";
export const getToken = async (user) => {
  //generate token
  const token = jwt.sign({ userkey: user._id }, process.env.JWT_SECRETKEY, {
    expiresIn: "1d",
  });
  return token;
};
