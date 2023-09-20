import pool from "../../database/dbConnection.js";

const getUserById = (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json("User not found");
    }
  });
};

export default getUserById;
