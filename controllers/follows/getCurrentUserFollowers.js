import pool from "../../database/dbConnection.js";

const getCurrentUserFollowers = (req, res) => {
  const { id } = req.decoded.user_id;

  const query = `SELECT followee_id FROM followers WHERE follower_id = ${id} AND accepted = 1`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.status(200).json({ result });
    }
  });
};

export default getCurrentUserFollowers;
