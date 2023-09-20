import edit_post_by_id from "../../controllers/post/editPostById.js";
import express from "express";
const router = express.Router();
router.put("/edit_post/:id", edit_post_by_id);

export default router;
