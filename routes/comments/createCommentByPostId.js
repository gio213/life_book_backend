import create_comment_by_post_id from "../../controllers/comments/createCommentByPostId.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";

const route = express.Router();

route.post("/create_comment/:id", passToken, create_comment_by_post_id);

export default route;
