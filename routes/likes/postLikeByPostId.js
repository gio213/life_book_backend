import post_like_by_post_id from "../../controllers/likes/postLikeByPostId.js";
import express from "express";
const router = express.Router();

router.post("/post_like/:id", post_like_by_post_id);

export default router;
