import createPost from "../../controllers/post/createPost.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
import upload from "../../config/imageUpload.js";
const router = express.Router();
router.post("/create_post", passToken, upload.single("post_image"), createPost);
export default router;
