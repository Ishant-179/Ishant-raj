import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiryTime: {
        type: Number,
        
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });


const File = mongoose.model("File", fileSchema);

export default File;