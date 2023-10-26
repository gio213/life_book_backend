import pool from "../../database/dbConnection.js";

const post_like_by_post_id = async (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.body.post_id;
  // check if user already liked this post

  try {
    // Check if the user has already liked the post
    const existingLike = await new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
        [post_id, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (existingLike.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already liked this post." });
    }

    // Insert a new like record into the 'likes' table
    await new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO likes (post_id, user_id) VALUES (?, ?)",
        [post_id, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Retrieve the post_author_id from the 'posts' table
    const postAuthorId = await new Promise((resolve, reject) => {
      pool.query(
        "SELECT user_id FROM posts WHERE post_id = ?",
        [post_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].user_id);
          }
        }
      );
    });

    // Insert a new notification record into the 'notifications' table
    await new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO notifications (sender_id, receiver_id, type) VALUES (?, ?, ?)",
        [id, postAuthorId, "Liked your post"],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Update the 'likes' column in the 'posts' table
    await new Promise((resolve, reject) => {
      pool.query(
        "UPDATE posts SET likes = likes + 1 WHERE post_id = ?",
        [post_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: "Post liked." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default post_like_by_post_id;
