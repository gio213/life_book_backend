import userSearch from "../../controllers/user/user search/userSearch.js";
import express from "express";

const router = express.Router();
router.get("/user_search", userSearch);

export default router;
