import pool from "../../database/dbConnection.js";

const unlike_post_by_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.body.post_id;
  // check if user already liked this post

  try {
    // Check if the user has already liked the post
    const existingLike = pool.query(
      "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
      [post_id, id]
    );

    if (existingLike.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    // delete a new like record into the 'likes' table
    pool.query("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [
      post_id,
      id,
    ]);
    pool.query(
      "DELETE FROM notifications WHERE sender_id = ? AND receiver_id = ? AND type = ?",
      [id, post_id, "like"]
    );

    // Update the 'likes' column in the 'posts' table
    pool.query("UPDATE posts SET likes = likes - 1 WHERE post_id = ?", [
      post_id,
    ]);

    res.status(200).json({ message: "Post unliked." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default unlike_post_by_id;
