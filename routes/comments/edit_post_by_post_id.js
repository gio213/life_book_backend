import edit_comment_by_comment_id from "../../controllers/comments/edit_post_by_post_id.js";
import express from "express";

const router = express.Router();
router.put("/edit_comment/:id", edit_comment_by_comment_id);

export default router;
