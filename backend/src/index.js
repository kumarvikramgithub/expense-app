import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./db/connection.js";
import { DB, SERVER } from "./constants.js";
config({
  path: ".env",
});

app.listen(process.env.PORT, () => {
  connectDB(`${process.env.DB_RUL}/${DB.name}`);
  console.log(`${SERVER.start} ${process.env.PORT}`);
});
