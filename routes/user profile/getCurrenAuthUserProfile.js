import getCurrenAuthUserProfile from "../../controllers/user profile/getCurrenAuthUserProfile.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.get("/current_user", passToken, getCurrenAuthUserProfile);

export default router;
