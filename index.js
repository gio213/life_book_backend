import user_register from "./routes/register/userRegister.js";
import user_login from "./routes/login/login.js";
import router from "./routes/login/login.js";
import getCurrenAuthUserProfile from "./routes/user profile/getCurrenAuthUserProfile.js";
import getUserById from "./routes/user profile/getUserById.js";
import createPost from "./routes/post/createPost.js";
import get_post_by_post_id from "./routes/post/getPostByPostId.js";
import edit_post_by_id from "./routes/post/editPostById.js";
import delete_post_by_id from "./routes/post/deletePostById.js";
// user register
router.post("/user_register", user_register);
// user login
router.post("/user_login", user_login);
// get current user profile
router.get("/current_user", getCurrenAuthUserProfile);
// get user by id
router.get("/get_user/:id", getUserById);
// create post
router.post("/create_post", createPost);
// get post by its id
router.get("/get_post/:id", get_post_by_post_id);
// edit post by its id
router.put("/edit_post/:id", edit_post_by_id);
// delete post by its id
router.delete("/delete_post/:id", delete_post_by_id);

export default router;
