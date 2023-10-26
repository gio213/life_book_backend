import pool from "../../database/dbConnection.js";

const { id } = req.decoded.user_id;
console.log(id);
const post_id = req.body.post_id;

try {
  // Check if the user has liked the post
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

  if (existingLike.length === 0) {
    return res.status(400).json({ message: "You haven't liked this post." });
  }

  // Delete the like record from the 'likes' table
  await new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM likes WHERE post_id = ? AND user_id = ?",
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

  // Delete the corresponding notification from the 'notifications' table
  await new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM notifications WHERE sender_id = ? AND receiver_id = ? AND type = ?",
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
      "UPDATE posts SET likes = likes - 1 WHERE post_id = ?",
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

  res.status(200).json({ message: "Post unliked." });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}

export default post_like_by_post_id;
