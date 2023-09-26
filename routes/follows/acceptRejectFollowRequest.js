import acceptRejectFollowRequest from "../../controllers/follows/acceptRejectFollowRequest.js";

import express from "express";
const router = express.Router();

router.put("/accept_reject_follow_request", acceptRejectFollowRequest);

export default router;
