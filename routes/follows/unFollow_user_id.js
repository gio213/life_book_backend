import unfollow_user_id from "../../controllers/follows/unFollow_user_id.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";

const router = express.Router();

router.delete("/unfollow_user_id", passToken, unfollow_user_id);

export default router;
