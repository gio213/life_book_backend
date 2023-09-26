import get_post_by_post_id from "../../controllers/post/getPostByPostId.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.get("/get_post/:id", passToken, get_post_by_post_id);

export default router;
