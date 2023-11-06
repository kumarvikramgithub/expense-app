import mongoose from "mongoose";
import { SchemaProperty } from "../utils/schema-property.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      ...SchemaProperty,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
