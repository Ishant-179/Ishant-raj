import cloudinary from "../config/cloudinaryConfig.js";
import File from "../models/fileModel.js";
import { sendDownloadEmail } from "../services/email.js";
import streamifier from "streamifier"; 


export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "fileshare" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadToCloudinary();

    const ttlMs = Number(req.body.ttlMs) || 3600_000;
    const expiryTime = new Date(Date.now() + ttlMs);

    const fileDoc = await File.create({
      filename: req.file.originalname,
      fileURL: result.secure_url,
      uploadedBy: req.user._id,
      expiryTime,
    });

    const downloadLink = `${process.env.BASE_URL}/api/files/download/${fileDoc._id}`;


    const recipient = req.body.recipientEmail || req.user.email;
    await sendDownloadEmail({
      to: recipient,
      filename: fileDoc.filename,
      link: downloadLink,
      expiresAt: expiryTime,
    });

    res.status(201).json({
      id: fileDoc._id,
      filename: fileDoc.filename,
      fileURL: fileDoc.fileURL,
      expiryTime,
      downloadLink,
    });
  } catch (err) {
    console.error("Error in uploading the files", err);
    return res.status(500).json({message: "Interval server error"});
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (Date.now() > file.expiryTime.getTime()) {
      return res.status(410).json({ message: "Download link expired" });
    }

    file.downloadCount++;
    await file.save();

    if (req.query.redirect === "1") {
      return res.redirect(file.fileURL);
    }

    res.json({
      url: file.fileURL,
      filename: file.filename,
      downloads: file.downloadCount,
    });
  } catch (err) {
    console.error("Error in downloading the files", err.message);
    return res.status(500).json({message: "Interval server error"});
  }
};
