import pool from "../../database/dbConnection.js";

const followUserId = async (req, res) => {
  const { id } = req.decoded.user_id;
  const followee_id = req.body.followee_id;
  const query =
    await `INSERT INTO followers (follower_id, followee_id) VALUES (${id}, ${followee_id})`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "You are already following this user",
      });
    } else {
      console.log(result);
      res.status(200).json({
        message: "Successfully followed user",
      });
    }
  });
};

export default followUserId;
