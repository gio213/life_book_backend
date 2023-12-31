import follow_user_id from "../../controllers/follows/follow_user_id.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";

const router = express.Router();

router.post("/follow_user_id", passToken, follow_user_id);

export default router;
