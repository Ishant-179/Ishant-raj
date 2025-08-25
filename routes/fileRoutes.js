import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadFile, downloadFile } from "../controllers/fileController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", verifyToken, upload.single("file"), uploadFile);
router.get("/download/:id", downloadFile);

export default router;
