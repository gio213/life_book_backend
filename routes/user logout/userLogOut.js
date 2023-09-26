import user_log_out from "../../controllers/user/logout/userLogOut.js";

import express from "express";

const router = express.Router();

router.get("/user_logout", user_log_out);

export default router;
