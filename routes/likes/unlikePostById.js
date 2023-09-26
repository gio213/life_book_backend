import unlike_post_by_id from "../../controllers/likes/unlikePostById.js";

import express from "express";

const router = express.Router();

router.delete("/unlike_post/:id", unlike_post_by_id);

export default router;
