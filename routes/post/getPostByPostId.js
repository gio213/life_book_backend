import get_post_by_post_id from "../../controllers/post/getPostByPostId.js";
import express from "express";
const router = express.Router();

router.get("/get_post/:id", get_post_by_post_id);

export default router;
