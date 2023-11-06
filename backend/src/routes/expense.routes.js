import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import {
  getExpenses,
  postExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
const router = Router();

router.use("/category", categoryRoutes);
router.get("/", getExpenses);
router.post("/create", postExpense);
router.put("/update", updateExpense);
router.delete("/delete", deleteExpense);

export default router;
