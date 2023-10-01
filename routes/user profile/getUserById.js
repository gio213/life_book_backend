import getUserByid from "../../controllers/user profile/getUserById.js";
import passToken from "../../generate token /pass the token/passTheToke.js";

import express from "express";
const router = express.Router();

router.get("/get_user/:id", passToken, getUserByid);

export default router;
