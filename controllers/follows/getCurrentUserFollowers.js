import pool from "../../database/dbConnection.js";

const getCurrentUserFollowers = (req, res) => {
  const follower_id = req.body.follower_id;
  const sql = `SELECT followee_id, timestamp FROM followers WHERE follower_id = ?`;
  pool.query(sql, follower_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    res.status(200).json({ message: `User ${follower_id} followers`, result });
  });
};

export default getCurrentUserFollowers;
