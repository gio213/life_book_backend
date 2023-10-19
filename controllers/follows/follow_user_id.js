import pool from "../../database/dbConnection.js";

const followUserId = async (req, res) => {
  const { id } = req.decoded.user_id;
  const followee_id = req.body.followee_id;
  const type = "follow request";

  const query =
    "INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)";
  const values = [id, followee_id];

  const insertNotification =
    "INSERT INTO notifications (sender_id, receiver_id, type) VALUES (?, ?, ?)";
  const notificationValues = [id, followee_id, type];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).json({
          message: "You are already following this user",
        });
      } else {
        res.status(500).json({
          message: "Error while following the user",
        });
      }
    } else {
      // The follow request was successful, now insert the notification
      pool.query(
        insertNotification,
        notificationValues,
        (notificationErr, notificationResult) => {
          if (notificationErr) {
            console.log(notificationErr);
            res.status(500).json({
              message: "Error while sending the notification",
            });
          } else {
            console.log(notificationResult);
            res.status(200).json({
              message: "Successfully followed user and notification sent",
            });
          }
        }
      );
    }
  });
};

export default followUserId;
