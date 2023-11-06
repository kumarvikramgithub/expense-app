import { Router } from "express";
import {
  getCategories,
  postCategory,
  updateCategory,
} from "../controllers/category.controller.js";
const router = Router();

router.get("/", getCategories);
router.post("/create", postCategory);
router.put("/update", updateCategory);

export default router;
