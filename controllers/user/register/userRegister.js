import pool from "../../../database/dbConnection.js";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config({ path: "./.env" });
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
  try {
    const { email, username, password, gender, birth_date } = req.body;
    console.log(req.body);
    const profile_picture = req.file;

    if (!username || !password || !email || !gender || !birth_date) {
      return res.status(400).json({ message: "Please fill in all fields" });
    } else if (profile_picture) {
      return res
        .status(400)
        .json({ message: "Please upload a profile picture" });
    }

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "That username is already in use" });
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: "That email is already in use" });
    }

    // const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    // salted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await insertUser(username, hashedPassword, email, gender, birth_date);
    console.log(username, email, hashedPassword, gender, birth_date);

    sendWelcomeEmail(username, email);

    res.status(200).json({ message: "User registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// Function to check if a username exists
const checkUsernameExists = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT username FROM users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      }
    );
  });
};

// Function to check if an email exists
const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      }
    );
  });
};

// Function to insert a user
const insertUser = (username, password, email, gender, birth_date) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users SET ?",
      { username, password, email, gender, birth_date },
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export default user_register;
