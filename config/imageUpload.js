import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//   cloud_name: "dimy1fj2c",
//   api_key: "572831746818761",
//   api_secret: "Cywf6-VRQFrWfwvKumeKZwlWmeM",
// });
// const storage = new CloudinaryStorage({
//   cloudinary,
//   folder: "uploads",
//   allowedFormats: ["jpg", "png", "jpeg", "gif"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });

cloudinary.v2.config({
  cloud_name: "dimy1fj2c",
  api_key: "572831746818761",
  api_secret: "Cywf6-VRQFrWfwvKumeKZwlWmeM",
});

// Set up Multer for file upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "profile_pictures", // Optional: Organize images in a folder
  },
});

const upload = multer({ storage: storage });
export default upload;
