import createPost from "../../controllers/post/createPost.js";
import passToken from "../../controllers/pass the token/passTheToke.js";
import express from "express";
const router = express.Router();
router.post("/create_post", passToken, createPost);
export default router;
