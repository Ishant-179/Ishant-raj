import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";

dotenv.config();


const app = express();

const PORT  = process.env.PORT || 8001;

connectDB()

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send({message: "API is running...."});
})


app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
})