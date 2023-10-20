import pool from "../../../database/dbConnection.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import generateJwtToken from "../../../generate token /generateJwtToken.js";

const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please fill in all fields" });
  } else {
    pool.query(
      "select * from users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.length > 0) {
          const isMatch = await bcrypt.compare(password, results[0].password);
          if (isMatch) {
            const id = results[0].user_id;
            const token = generateJwtToken({ id: id });
            // send cookie to cookie storage
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 1000,
            });
            res.status(200).json({ message: "User logged in", token: token });
          } else {
            res.status(400).json({ message: "Password is incorrect" });
          }
        } else {
          res.status(400).json({ message: "User does not exist" });
        }
      }
    );
  }
};

export default userLogin;
