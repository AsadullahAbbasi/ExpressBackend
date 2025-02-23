import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import app from "./app.js";
dotenv.config();

dbConnect()
.then((res) => {
  console.log(`MongoDB Connected: ${res.connection.host}`);
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
  
})
.catch((err) => {
  // console.log(err);
})




// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import uploadCloudinary from "./utils/cloudinary.js";
// import dotenv from "dotenv";


// // Fix __dirname issue for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 5500;

// // Middleware
// app.use(cors()); // Allow frontend to call API

// // Configure Multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public")); // Save files in 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname); // Get file extension
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage });

// // File Upload Route
// app.post("/upload", upload.fields([{ name: "file", maxCount: 1 }]), async(req, res) => {
//   console.log(req.files.file);
//  let a = await uploadCloudinary(req.files.file[0].path);
//   console.log(a);
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
  
//   res.json({ originalName: req.file.originalname, path: req.file.path });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
