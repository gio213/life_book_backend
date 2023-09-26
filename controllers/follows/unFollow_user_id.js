import pool from "../../database/dbConnection.js";

const unfollow_user_id = (req, res) => {
  const follower = req.body.follower;
  const followee = req.body.followee;
  const sql = `DELETE FROM followers WHERE follower_id = ? AND followee_id = ?`;
  pool.query(sql, [follower, followee], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    res.status(200).json(`user ${follower} unfollowed user ${followee}`);
  });
};

export default unfollow_user_id;
