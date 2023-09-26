import getCurrentUserFollowers from "../../controllers/follows/getCurrentUserFollowers.js";
import express from "express";
const router = express.Router();

router.get("/get_current_user_followers", getCurrentUserFollowers);

export default router;
