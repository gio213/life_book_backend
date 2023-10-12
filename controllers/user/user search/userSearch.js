import pool from "../../../database/dbConnection.js";

const userSearch = (req, res) => {
  const userId = req.decoded.user_id;

  const userName = req.body.username;
  console.log(userName);

  if (!userName) {
    return res.status(400).json("Username parameter is missing or empty.");
  }

  const sql = "SELECT * FROM users WHERE username LIKE ?";
  const searchPattern = `%${userName}%`;

  pool.query(sql, [searchPattern], (err, result) => {
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
