import pool from "../../database/dbConnection.js";

const unfollow_user_id = (req, res) => {
  const { id } = req.decoded.user_id;
  const followee = req.body.followee;

  const checkIfFolloweeExist = `SELECT * FROM followers WHERE follower_id = ${id} AND followee_id = ${followee}`;
  pool.query(checkIfFolloweeExist, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    if (result.length === 0) {
      res.status(404).json(`user ${followee} is not followed by user ${id}`);
    } else {
      const sql = `DELETE FROM followers WHERE follower_id = ${id} AND followee_id = ${followee}`;
      pool.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json("Server error");
        }
        res
          .status(200)
          .json(`user ${id} unfollowed user ${followee} successfully`);
      });
    }
  });
};
export default unfollow_user_id;
