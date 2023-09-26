import pool from "../../database/dbConnection.js";

const follow_user_id = (req, res) => {
  const { id } = req.decoded.user_id;
  const followee = req.body.followee;
  console.log(`user ${id}  followe ${followee}`);
  const sql = `INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)`;
  pool.query(sql, [id, followee], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    res.status(200).json(`user ${id} sent  follow request to user ${followee}`);
  });
};
export default follow_user_id;
