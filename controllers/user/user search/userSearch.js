import pool from "../../../database/dbConnection.js";

const userSearch = (req, res) => {
  const userName = req.body.username;
  const sql = `SELECT * FROM users WHERE username LIKE '%${userName}%'`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
    res.status(200).json({ message: `Users `, result });
  });
};

export default userSearch;
