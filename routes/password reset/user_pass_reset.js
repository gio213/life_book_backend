import user_pass_reset from "../../controllers/user/password reset/user_pass_reset.js";

import express from "express";

const router = express.Router();

router.put("/password_reset", user_pass_reset);

export default router;
