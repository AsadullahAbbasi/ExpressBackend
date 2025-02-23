import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //multer will call tis function with 3 arguments and we are calling third argument with expected two args
    cb(null, path.join(__dirname, "../../public"));
    
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix+path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export { upload };
