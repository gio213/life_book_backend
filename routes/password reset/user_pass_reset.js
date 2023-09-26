import user_pass_reset from "../../controllers/user/password reset/user_pass_reset.js";
import passToken from "../../generate token /pass the token/passTheToke.js";

import express from "express";

const router = express.Router();

router.put("/password_reset", passToken, user_pass_reset);

export default router;
