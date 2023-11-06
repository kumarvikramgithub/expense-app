import mongoose from "mongoose";
import { SchemaProperty } from "../utils/schema-property.js";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      ...SchemaProperty,
    },
    amount: {
      ...SchemaProperty,
    },
    notes: {
      ...SchemaProperty,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
