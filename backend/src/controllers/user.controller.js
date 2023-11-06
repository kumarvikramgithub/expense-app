import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { getToken } from "./../utils/get-tokens.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}, { __v: 0, password: 0 });
  res.status(200).json({
    message: `Status 200: All users`,
    ...users,
  });
};

export const getUserByKey = (req, res) => {
  const searchedValue = req.body.value;
  const searchedBy = req.body.key;
  getUser(searchedBy, searchedValue, res);
};

const getUser = async (key, value, res) => {
  const users = await User.find({ [key]: value }, { __v: 0, password: 0 });
  res.status(200).json({
    message: `Status 200: All user(s)`,
    users,
  });
};

export const postUser = async (req, res) => {
  const userData = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12),
  };
  const newUser = await User.create(userData);
  if (newUser) {
    const token = await getToken(newUser);
    const user = { ...newUser._doc };
    delete user.password;
    delete user.__v;
    res.status(200).json({
      message: `Status 200: User Registered Successfully`,
      ...user,
      token,
    });
  } else {
    res.status(500).json({
      error: `Status 500: Something went wrong, try again.`,
    });
  }
};

export const loginUser = async (req, res) => {
  const { isLogin, user, password } = req.body;
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      const token = await getToken(user);
      delete user.password;
      delete user.__v;
      res.status(200).json({
        message: `Status 200: User Login Successfully`,
        ...user,
        token,
      });
    } else
      res.status(400).json({
        error: `Wrong credintials!.`,
      });
  } else
    res.status(400).json({
      error: `User not registered!.`,
    });
};

export const updateUser = async (req, res) => {
  const { id, name, email } = req.body;
  const newUser = await User.updateOne(
    { _id: id },
    { $set: { name: name, email: email } }
  );
  if (newUser) {
    let user = await User.findOne({ _id: id }, { password: 0, __v: 0 });
    user = user._doc;
    res.status(200).json({
      message: `Status 200: User updated Successfully`,
      ...user,
    });
  } else {
    res.status(500).json({
      error: `Status 500: Something went wrong, try again.`,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  const { id, password } = req.body;
  const newUser = await User.updateOne(
    { _id: id },
    { $set: { password: await bcrypt.hash(password, 12) } }
  );
  if (newUser) {
    res.status(200).json({
      message: `Status 200: Password updated successfully.`,
    });
  } else {
    res.status(500).json({
      error: `Status 500: Something went wrong, try again.`,
    });
  }
};
