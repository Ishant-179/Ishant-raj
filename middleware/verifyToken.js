import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export const verifyToken = async(req, res, next) => {
    try {
        const headers = req.headers["authorization"];
        const token = headers.split(" ")[1];

        if(!token) {
            return res.status(403).json({message: "no token found"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) {
                return res.status(404).json({message: "error in finding token"});
            }

             next();
        })

    } catch (error) {
           console.error("Error in verifying token", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};