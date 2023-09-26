import unfollow_user_id from "../../controllers/follows/unFollow_user_id.js";

import express from "express";

const router = express.Router();

router.delete("/unfollow_user_id", unfollow_user_id);

export default router;
