import pool from "../../../database/dbConnection.js";

const userSearch = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);

  const userName = req.body.username;
  console.log(userName);

  if (!userName) {
    return res.status(400).json("Username parameter is missing or empty.");
  }

  const searchPattern = `%${userName}%`;

  const sql = `
  SELECT users.*,
         CASE
            WHEN followers.accepted = 1 THEN 'Following'
            WHEN followers.accepted = 0 THEN 'Follow Request Pending'
            ELSE 'Not Following'
         END AS follow_status
  FROM users
  LEFT JOIN (
    SELECT followee_id, accepted
    FROM followers
    WHERE follower_id = ${id}
  ) AS followers
  ON users.user_id = followers.followee_id
  WHERE username LIKE '${searchPattern}'
  AND users.user_id != ${id};
`;

  pool.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Server error");
    }
    if (result.length === 0) {
      return res.status(404).json("No users found");
    } else {
      return res
        .status(200)
        .json({ message: "Successfully retrieved users.", result });
    }
  });
};

export default userSearch;
