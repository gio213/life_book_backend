import createPost from "../../controllers/post/createPost.js";
import express from "express";
const router = express.Router();
router.post("/create_post", createPost);
export default router;
