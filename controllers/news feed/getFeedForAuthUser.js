import pool from "../../database/dbConnection.js";

const get_feed_for_auth_user = async (req, res) => {
  const { id } = req.decoded.user_id;
  const query = `
SELECT
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  users.username as author,
  users.profile_picture as profilePicture,
  CASE
    WHEN (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id AND likes.user_id = ${id}) > 0 THEN 'true'
    ELSE 'false'
  END as currentUserLiked,
  JSON_ARRAYAGG(users.username) as likedByUsers,
  posts.likes as likes
FROM
  posts
  JOIN users ON users.user_id = posts.user_id
WHERE
  posts.user_id = ${id} -- User's own posts
GROUP BY
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  author,
  profilePicture,
  currentUserLiked,
  likes

UNION

SELECT
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  users.username as author,
  users.profile_picture as profilePicture,
  CASE
    WHEN (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id AND likes.user_id = ${id}) > 0 THEN 'true'
    ELSE 'false'
  END as currentUserLiked,
  JSON_ARRAYAGG(users.username) as likedByUsers,
  posts.likes as likes
FROM
  posts
  JOIN followers ON followers.followee_id = posts.user_id
  JOIN users ON users.user_id = posts.user_id
WHERE
  (followers.follower_id = ${id} AND followers.accepted = 1) -- Posts by those followed
GROUP BY
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  author,
  profilePicture,
  currentUserLiked,
  likes

UNION

SELECT
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  users.username as author,
  users.profile_picture as profilePicture,
  CASE
    WHEN (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id AND likes.user_id = ${id}) > 0 THEN 'true'
    ELSE 'false'
  END as currentUserLiked,
  JSON_ARRAYAGG(users.username) as likedByUsers,
  posts.likes as likes
FROM
  posts
  JOIN followers ON followers.follower_id = posts.user_id
  JOIN users ON users.user_id = posts.user_id
WHERE
  (followers.followee_id = ${id} AND followers.accepted = 1) -- Posts by those who follow the user
GROUP BY
  posts.post_id,
  posts.user_id,
  posts.content,
  posts.created_at,
  posts.post_image,
  author,
  profilePicture,
  currentUserLiked,
  likes

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
