import pool from "../../database/dbConnection.js";

const unlike_post_by_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.params.id;
  // first check if post has a like from this user
  pool.query(
    `SELECT * FROM likes WHERE post_id = ${post_id} AND user_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else {
        if (result.length === 0) {
          res.status(403).json({ message: "You did not like this post" });
        } else {
          pool.query(
            `DELETE FROM likes WHERE post_id = ${post_id} AND user_id = ${id}`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Server error" });
              } else {
                res.status(200).json({ message: "Post unliked" });
              }
            }
          );
        }
      }
    }
  );
};

export default unlike_post_by_id;
