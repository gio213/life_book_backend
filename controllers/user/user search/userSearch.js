import pool from "../../../database/dbConnection.js";

const userSearch = (req, res) => {
  const { id } = req.decoded.user_id;
  const userName = req.body.username;
  const sql = `SELECT * FROM users WHERE username LIKE '%${userName}%'`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error" + err);
    }
    if (result.length === 0) {
      res.status(400).json("No users found");
    } else {
      res
        .status(200)
        .json({ message: "Successfully retrieved users.", result });
    }
  });
};

export default userSearch;
