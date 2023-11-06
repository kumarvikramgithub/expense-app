import { Router } from "express";
import userRoutes from "./user.routes.js";
import expenseRoutes from "./expense.routes.js";
import { authenticateUser } from "../middleware/user.middleware.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/expenses", authenticateUser, expenseRoutes);
router.all("*", (req, res) => {
  res.send("Unauthorized access");
});
export default router;
