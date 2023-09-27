import exp from "constants";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, newDate().toISOString() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

export default upload;
