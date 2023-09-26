import edit_post_by_id from "../../controllers/post/editPostById.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();
router.put("/edit_post/:id", passToken, edit_post_by_id);

export default router;
