import getCurrentUserFollowers from "../../controllers/follows/getCurrentUserFollowers.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.get("/get_current_user_followers", passToken, getCurrentUserFollowers);

export default router;
