import pool from "../../../database/dbConnection.js";
import bcrypt from "bcrypt";
import transporter from "../../../config/nodemailer.js";

const sendWelcomeEmail = (userName, email, new_password) => {
  transporter.sendMail(
    {
      from: "gio.patsia@gmail.com",
      to: email,
      subject: "Password reset",
      text: `Hello ${userName}, your password was changed successfully. Your new password is ${new_password}. If you did not change your password, please contact us`,
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

const user_pass_reset = (req, res) => {
  const userName = req.body.username;
  const new_password = req.body.newPassword;
  const email = req.body.email;
  const old_password = req.body.oldPassword;
  const { id } = req.decoded.user_id;

  // check if email and username exists with this id
  const query =
    "SELECT * FROM users WHERE email = ? AND user_id = ? AND username = ?";
  pool.query(query, [email, id, userName], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    } else {
      if (results.length > 0) {
        // check if old password is correct
        const oldPassword = results[0].password;
        const isOldPasswordCorrect = await bcrypt.compare(
          old_password,
          oldPassword
        );
        if (isOldPasswordCorrect) {
          // check if new password is the same as old password
          const isNewPasswordSameAsOldPassword = await bcrypt.compare(
            new_password,
            oldPassword
          );
          if (isNewPasswordSameAsOldPassword) {
            res.status(400).json({
              message:
                "New password cannot be the same as the old password. Please try again",
            });
          } else {
            // hash the new password
            const hashedNewPassword = await bcrypt.hash(new_password, 10);
            // update the password
            const query = "UPDATE users SET password = ? WHERE user_id = ?";
            pool.query(
              query,
              [hashedNewPassword, results[0].user_id],
              (error, results) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ message: "An error occurred" });
                } else {
                  sendWelcomeEmail(userName, email, new_password);
                  res.status(200).json({
                    message: "Password updated successfully",
                  });
                }
              }
            );
          }
        } else {
          res.status(400).json({
            message: "Old password is incorrect. Please try again",
          });
        }
      } else {
        res.status(400).json({
          message: "Email, username or user id is incorrect. Please try again",
        });
      }
    }
  });
};

export default user_pass_reset;
