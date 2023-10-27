import pool from "../../database/dbConnection.js";

const getCurrentUserFollowers = (req, res) => {
  const { id } = req.decoded.user_id;

  const query = `SELECT u.user_id, u.username, u.profile_picture
FROM users u
JOIN followers f ON u.user_id = f.follower_id
WHERE f.followee_id = ${id} AND f.accepted = 1;
`;

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
