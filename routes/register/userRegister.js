import user_register from "../../controllers/user/register/userRegister.js";
import express from "express";
import upload from "../../config/imageUpload.js";
const router = express.Router();

router.post("/user_register", upload.single("profilePicture"), user_register);

export default router;
