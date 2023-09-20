import user_login from "../../controllers/user/login/userLogin.js";
import express from "express";
const router = express.Router();

router.post("/user_login", user_login);

export default router;
