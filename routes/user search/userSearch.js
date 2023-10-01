import userSearch from "../../controllers/user/user search/userSearch.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";

const router = express.Router();
router.post("/user_search", passToken, userSearch);

export default router;
