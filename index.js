import user_register from "./routes/register/userRegister.js";
import user_login from "./routes/login/login.js";
import router from "./routes/login/login.js";
import getCurrenAuthUserProfile from "./routes/user profile/getCurrenAuthUserProfile.js";
import getUserById from "./routes/user profile/getUserById.js";
import createPost from "./routes/post/createPost.js";
import get_post_by_post_id from "./routes/post/getPostByPostId.js";
import edit_post_by_id from "./routes/post/editPostById.js";
import delete_post_by_id from "./routes/post/deletePostById.js";
import get_feed_for_auth_user from "./routes/neews feed/getNeewsFeedForAuthUser.js";
import post_like from "./routes/likes/postLikeByPostId.js";
import unlike_post_by_id from "./routes/likes/unlikePostById.js";
import create_comment_by_post_id from "./routes/comments/createCommentByPostId.js";
import delete_comment_by_id from "./routes/comments/delete_comment_by_id.js";
import edit_comment from "./routes/comments/edit_comment.js";
import follow_user_id from "./routes/follows/follow_user_id.js";
import unfollow_user_id from "./routes/follows/unFollow_user_id.js";
import acceptRejectFollowRequest from "./routes/follows/acceptRejectFollowRequest.js";
import getCurrentUserFollowers from "./routes/follows/getCurrentUserFollowers.js";
import userSearch from "./routes/user search/userSearch.js";
import user_log_out from "./routes/user logout/userLogOut.js";
import user_pass_reset from "./routes/password reset/user_pass_reset.js";
import getNotifications from "./routes/notifications/notifications.js";
import create_message from "./routes/messages/createMessage.js";
import get_messages from "./routes/messages/getMessages.js";
// user register
router.post("/user_register", user_register);
// user login
router.post("/user_login", user_login);
// get current user profile protected route
router.get("/current_user", getCurrenAuthUserProfile);
// get user by id
router.get("/get_user/:id", getUserById);
// create post protected route
router.post("/create_post", createPost);
// get post by its id protected route
router.get("/get_post/:id", get_post_by_post_id);
// edit post by its id protected route
router.put("/edit_post/:id", edit_post_by_id);
// delete post by its id protected route
router.delete("/delete_post/:id", delete_post_by_id);
// get news feed for auth user protected route
router.get("/get_feed_for_auth_user", get_feed_for_auth_user);
// post like by post id protected route
router.post("/post_like", post_like);
// unlike post by post id protected route
router.delete("/unlike_post", unlike_post_by_id);
// create comment by post id protected route
router.post("/create_comment", create_comment_by_post_id);
// delete comment by id protected route
router.delete("/delete_comment/:id", delete_comment_by_id);
// edit comment by comment id protected route
router.put("/edit_comment/:id", edit_comment);
// follow user by id protected route
router.post("/follow_user_id", follow_user_id);
// unfollow user by id protected route
router.delete("/unfollow_user_id", unfollow_user_id);
// accept reject follow request protected route
router.post("/accept_reject_follow_request", acceptRejectFollowRequest);
// get current user followers protected route
router.get("/get_current_user_followers", getCurrentUserFollowers);
// user search protected route
router.post("/user_search", userSearch);
// user log out
router.get("/user_logout", user_log_out);
// user password reset protected route
router.put("/password_reset", user_pass_reset);
// get notifications protected route
router.get("/get_notifications", getNotifications);
// create message protected route
router.post("/create_message", create_message);
// get messages protected route
router.get("/get_messages", get_messages);

export default router;
