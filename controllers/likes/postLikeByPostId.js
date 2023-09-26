import pool from "../../database/dbConnection.js";

const post_like_by_post_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.params.id;
  // check if user already liked this post

  // if not, add like
  pool.query(
    `SELECT * FROM likes WHERE post_id = ${post_id} AND user_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else {
        if (result.length > 0) {
          res.status(403).json({ message: "You already liked this post" });
        } else {
          pool.query(
            `INSERT INTO likes (post_id, user_id) VALUES (${post_id}, ${id})`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
              } else {
                res.status(200).json({ message: "Post liked" });
              }
            }
          );
        }
      }
    }
  );
};

export default post_like_by_post_id;
