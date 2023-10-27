import create_message from "../../controllers/messages/createMessage.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.post("/create_message", passToken, create_message);

export default router;
