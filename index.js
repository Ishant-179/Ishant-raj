import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js"

dotenv.config();


const app = express();

const PORT  = process.env.PORT || 8001;

connectDB()

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send({message: "API is running...."});
})


app.use("/api/auth", userRoutes);
app.use("/api/files", fileRoutes);


app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`)
})