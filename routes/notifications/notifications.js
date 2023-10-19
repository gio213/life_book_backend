import getNotifications from "../../controllers/notifications/notifications.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.get("/get_notifications", passToken, getNotifications);

export default router;
