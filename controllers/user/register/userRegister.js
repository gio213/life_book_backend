import pool from "../../../database/dbConnection.js";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config({ path: "./.env" });
import nodemailer from "../../../config/nodemailer.js";
import transporter from "../../../config/nodemailer.js";

const sendWelcomeEmail = (username, email) => {
  transporter.sendMail(
    {
      from: "gio.patsia@gmail.com",
      to: email,
      subject: "Welcome to our website",
      text: `Hello ${username}, welcome to our website. We are happy to have you here.`,
    },
    (err, info) => {
      if (err) {
        console.log("Error sending email. " + err.message);
      } else {
        console.log("Email sent successfully." + info.response);
      }
    }
  );
};

const user_register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  if ((!username || !password, !email)) {
    res.json({ message: "Please fill in all fields" });
  } else {
    pool.query(
      "select username from users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          console.log(results);
        }
        if (results.length > 0) {
          res.json({ message: "That username is already in use" });
          console.log("That username is already in use");
        }
      }
    );
    pool.query(
      "select username from users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.log(results);
        }
        if (results.length > 0) {
          res.json({ message: "That email is already in use" });
          console.log("That email is already in use");
        }
      }
    );
    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    pool.query(
      "INSERT INTO users SET ? ",
      {
        username: username,
        password: hashedPassword,
        email: email,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
          sendWelcomeEmail(username, email);
          res.json({ message: "User registered" });
        }
      }
    );
  }
};
export default user_register;
