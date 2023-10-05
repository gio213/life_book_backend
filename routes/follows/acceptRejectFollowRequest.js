import acceptRejectFollowRequest from "../../controllers/follows/acceptRejectFollowRequest.js";
import passToken from "../../generate token /pass the token/passTheToke.js";
import express from "express";
const router = express.Router();

router.put(
  "/accept_reject_follow_request",
  passToken,
  acceptRejectFollowRequest
);

export default router;
