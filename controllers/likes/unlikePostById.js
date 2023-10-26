import pool from "../../database/dbConnection.js";

const unlike_post_by_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.body.post_id;
  let postAuthorId;

  // Get the post author's ID
  pool
    .query("SELECT user_id FROM posts WHERE post_id = ?", [post_id])
    .then((postAuthor) => {
      if (postAuthor.length === 0) {
        return res.status(404).json({ message: "Post not found." });
      }

      postAuthorId = postAuthor[0].user_id;

      // Check if the user has already liked the post
      return pool.query(
        "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
        [post_id, id]
      );
    })
    .then((existingLike) => {
      if (existingLike.length === 0) {
        return res
          .status(400)
          .json({ message: "You have not liked this post." });
      }

      // Delete the like record from the 'likes' table
      return pool.query("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [
        post_id,
        id,
      ]);
    })
    .then(() => {
      // Delete the corresponding notification
      return pool.query(
        "DELETE FROM notifications WHERE sender_id = ? AND receiver_id = ? AND type = ?",
        [id, postAuthorId, "Liked your post"]
      );
    })
    .then(() => {
      // Update the 'likes' column in the 'posts' table
      return pool.query(
        "UPDATE posts SET likes = likes - 1 WHERE post_id = ?",
        [post_id]
      );
    })
    .then(() => {
      res.status(200).json({ message: "Post unliked." });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export default unlike_post_by_id;
