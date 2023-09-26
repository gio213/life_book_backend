import follow_user_id from "../../controllers/follows/follow_user_id.js";

import express from "express";

const router = express.Router();

router.post("/follow_user_id", follow_user_id);

export default router;
