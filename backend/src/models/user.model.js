import mongoose from "mongoose";
import { SchemaProperty } from "../utils/schema-property.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      ...SchemaProperty,
    },
    email: {
      ...SchemaProperty,
      unique: true,
    },
    password: {
      ...SchemaProperty,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
