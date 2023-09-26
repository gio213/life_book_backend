import pool from "../../database/dbConnection.js";

const follow_user_id = (req, res) => {
  const follower = req.body.follower;
  const followee = req.body.followee;
  const sql = `INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)`;
  pool.query(sql, [follower, followee], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    res
      .status(200)
      .json(`user ${follower} sent  follow request to user ${followee}`);
  });
};
export default follow_user_id;
