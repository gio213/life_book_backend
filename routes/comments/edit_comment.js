import edit_comment from "../../controllers/comments/edit_comment.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";

const router = express.Router();
router.put("/edit_comment/:id", passToken, edit_comment);

export default router;
