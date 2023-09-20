import user_register from "../../controllers/user/register/userRegister.js";
import express from "express";
const router = express.Router();

router.post("/user_register", user_register);

export default router;
