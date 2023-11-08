import express from "express";
import cors from "cors";
import appRoutes from "./routes/routes.js";
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", appRoutes);

export default app;
