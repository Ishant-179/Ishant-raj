import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
         type: String,
         required: true 
        },
    fileURL: {
         type: String,
         required: true 
        },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     },
    expiryTime: { 
        type: Date,
        required: true
     },
    downloadCount: { 
        type: Number,
         default: 0 
        }
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;