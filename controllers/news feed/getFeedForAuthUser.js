import pool from "../../database/dbConnection.js";

const get_feed_for_auth_user = async (req, res) => {
  const { id } = req.decoded.user_id;
  const query = `
SELECT
  posts.*,
  users.username as author,
  users.profile_picture as profilePicture,
  EXISTS (SELECT 1 FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ${id}) as currentUserLiked,
  (SELECT GROUP_CONCAT(users.username) FROM post_likes JOIN users ON post_likes.user_id = users.user_id WHERE post_likes.post_id = posts.post_id) as likedByUsers
FROM
  posts
  JOIN users ON users.user_id = posts.user_id
WHERE
  posts.user_id = ${id} -- User's own posts

UNION

SELECT
  posts.*,
  users.username as author,
  users.profile_picture as profilePicture,
  EXISTS (SELECT 1 FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ${id}) as currentUserLiked,
  (SELECT GROUP_CONCAT(users.username) FROM post_likes JOIN users ON post_likes.user_id = users.user_id WHERE post_likes.post_id = posts.post_id) as likedByUsers
FROM
  posts
  JOIN followers ON followers.followee_id = posts.user_id
  JOIN users ON users.user_id = posts.user_id
WHERE
  (followers.follower_id = ${id} AND followers.accepted = 1) -- Posts by those followed

UNION

SELECT
  posts.*,
  users.username as author,
  users.profile_picture as profilePicture,
  EXISTS (SELECT 1 FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ${id}) as currentUserLiked,
  (SELECT GROUP_CONCAT(users.username) FROM post_likes JOIN users ON post_likes.user_id = users.user_id WHERE post_likes.post_id = posts.post_id) as likedByUsers
FROM
  posts
  JOIN followers ON followers.follower_id = posts.user_id
  JOIN users ON users.user_id = posts.user_id
WHERE
  (followers.followee_id = ${id} AND followers.accepted = 1) -- Posts by those who follow the user

ORDER BY created_at DESC;

`;

  console.log(query);
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      console.log(query);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      res.status(200).json({ message: "Posts from you follow", result });
    }
  });
};

export default get_feed_for_auth_user;
