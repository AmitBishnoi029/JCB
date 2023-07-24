import express from "express";
import { connect } from "./Database/db.js";
import router from "./Routes/auth.js";
import morgan from "morgan";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: __dirname + "/Config/.env"});

// CALL DATABASE FUNCTION
connect();

const app = express()
app.use(express.json())
app.use(morgan('dev'));

app.use(cors());

//defining router
app.use("/auth",router)

const PORT = process.env.PORT || "8000";
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})