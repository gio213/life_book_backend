import delete_comment_by_id from "../../controllers/comments/delete_comment_by_id.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.delete("/delete_comment/:id", passToken, delete_comment_by_id);

export default router;
