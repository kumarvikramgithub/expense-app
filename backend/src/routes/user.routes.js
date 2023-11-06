import { Router } from "express";
import {
  getAllUsers,
  getUserByKey,
  postUser,
  loginUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { userExist, authenticateUser } from "../middleware/user.middleware.js";
const router = Router();

router.get("/", authenticateUser, getAllUsers);
router.get("/:searchBy/:key", authenticateUser, getUserByKey);
router.post("/register", userExist, postUser);
router.post("/login", userExist, loginUser);
router.put("/update", authenticateUser, updateUser);
router.put("/update-password", authenticateUser, updateUserPassword);

export default router;
