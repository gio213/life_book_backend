import post_like_by_post_id from "../../controllers/likes/postLikeByPostId.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.post("/post_like/:id", passToken, post_like_by_post_id);

export default router;
