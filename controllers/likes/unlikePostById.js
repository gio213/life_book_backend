import pool from "../../database/dbConnection.js";

const unlike_post_by_id = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.body.user_id;
  // check if user already liked this post
  pool.query(
    `SELECT * FROM likes WHERE post_id = ${post_id} AND user_id = ${user_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else {
        if (result.length > 0) {
          pool.query(
            `DELETE FROM likes WHERE post_id = ${post_id} AND user_id = ${user_id}`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
              } else {
                res.status(200).json({ message: "Post unliked" });
              }
            }
          );
        } else {
          res.status(403).json({ message: "You haven't liked this post" });
        }
      }
    }
  );
};

export default unlike_post_by_id;
