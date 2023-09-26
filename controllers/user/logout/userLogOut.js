import pool from "../../../database/dbConnection.js";

const user_log_out = (req, res) => {
  res.json({ message: "User log out successfully" });
};

export default user_log_out;
