import express from "express";
import user_register from "./routes/register/userRegister.js";
import user_login from "./routes/login/login.js";
import router from "./routes/login/login.js";
import getCurrenAuthUserProfile from "./routes/user profile/getCurrenAuthUserProfile.js";

// user register
router.post("/user_register", user_register);
// user login
router.post("/user_login", user_login);
// get current user profile
router.get("/current_user", getCurrenAuthUserProfile);

export default router;
