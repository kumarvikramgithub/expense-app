import { Router } from "express";
import categoryRoutes from "./category.routes.js";

const router = Router();

router.use("/category", categoryRoutes);
router.use("/", (req, res) => {
  res.send("Expense Routes");
});

export default router;
