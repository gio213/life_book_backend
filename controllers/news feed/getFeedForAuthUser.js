import pool from "../../database/dbConnection.js";

const get_feed_for_auth_user = async (req, res) => {
  const { id } = req.decoded.user_id;
  pool.query(
    `SELECT * FROM posts WHERE user_id = ${id} ORDER BY created_at DESC`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("Server error");
      } else {
        if (result.length === 0) {
          res.status(404).json("No posts found");
        } else {
          res.status(200).json(result);
        }
      }
    }
  );
};

export default get_feed_for_auth_user;
