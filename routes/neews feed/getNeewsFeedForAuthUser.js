import get_feed_for_auth_user from "../../controllers/news feed/getFeedForAuthUser.js";
import passToken from "../../controllers/pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.get("/get_feed_for_auth_user", passToken, get_feed_for_auth_user);

export default router;
