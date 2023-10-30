import get_messages from "../../controllers/messages/getMessages.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.post("/get_messages", passToken, get_messages);

export default router;
