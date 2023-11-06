import express from 'express';
import {config} from 'dotenv';
import connectDB from './db/connection.js'
import { DB, SERVER } from "./constants.js";
import appRoutes from './routes/routes.js'

config({
    path: '.env'
});
connectDB(`${process.env.DB_RUL}/${DB.name}`);
const app = express();

//middleware
app.use(express.json());


// Routes 
app.use('/', appRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`${SERVER.start} ${process.env.PORT}`);
})