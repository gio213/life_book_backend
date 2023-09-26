import pool from "../../../database/dbConnection.js";
import bcrypt from "bcrypt";

const user_pass_reset = (req, res) => {
  const user_id = req.body.user_id;
  const new_password = req.body.password;

  pool.query(
    `SELECT * FROM users WHERE user_id = '${user_id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("Server error");
      }
      if (result.length === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        bcrypt.hash(new_password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            res.status(500).json("Server error");
          }
          pool.query(
            `UPDATE users SET password = '${hash}' WHERE user_id = '${user_id}'`,
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json("Server error");
              }
              res.status(200).json({ message: "Password updated" });
            }
          );
        });
      }
    }
  );
};

export default user_pass_reset;
