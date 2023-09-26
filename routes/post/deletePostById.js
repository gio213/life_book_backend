import delete_post_by_id from "../../controllers/post/deletePostById.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.delete("/delete_post/:id", passToken, delete_post_by_id);

export default router;
