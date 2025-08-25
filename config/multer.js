import multer from "multer";
import cloudinary from "./cloudinaryConfig.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'upload',
        allowed_formats: ['png', 'jpg', 'webp', 'jpeg'] 
    }
})

const upload = multer({ storage });

export default upload;
