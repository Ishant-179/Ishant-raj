import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();


app.get("/", (req, res) => {
    res.send({message: "API is running...."});
})


app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
})