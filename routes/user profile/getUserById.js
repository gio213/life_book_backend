import getUserByid from "../../controllers/user profile/getUserById.js";

import express from "express";
const router = express.Router();

router.get("/get_user/:id", getUserByid);

export default router;
