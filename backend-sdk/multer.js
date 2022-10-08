import multer, { diskStorage } from "multer";
import { extname } from "path";

// Multer config
export default multer({
  storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".pdf" &&
      ext !== ".docx" &&
      ext !== ".doc"
    ) {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});