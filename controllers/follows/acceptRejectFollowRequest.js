import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = async (req, res) => {
  const {
    user_id: { id },
  } = req.decoded;
  const { follower_id, accepted } = req.body;

  console.log(id);

  try {
    if (accepted === "1") {
      await acceptFollowRequest(id, follower_id);
    } else {
      await rejectFollowRequest(id, follower_id);
    }

    return res
      .status(200)
      .json(
        accepted === "1" ? "Follow request accepted" : "Follow request rejected"
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};

const acceptFollowRequest = async (id, follower_id) => {
  const updateQuery =
    "UPDATE followers SET accepted = 1 WHERE follower_id = ? AND followee_id = ?";
  const insertQuery =
    "INSERT INTO followers (follower_id, followee_id, accepted) VALUES (?, ?, 1)";

  const deleteNotificationQuery =
    "DELETE FROM notifications WHERE sender_id = ? AND receiver_id = ? AND type = 'Sent you a follow request'";
  const insertNotificationQuery =
    "INSERT INTO notifications (sender_id, receiver_id, type) VALUES (?, ?, ' Accepted  your follow request')";

  await executeQuery(updateQuery, [follower_id, id]);
  await executeQuery(insertQuery, [id, follower_id]);
  await executeQuery(deleteNotificationQuery, [follower_id, id]);
  await executeQuery(insertNotificationQuery, [id, follower_id]);
};

const rejectFollowRequest = async (id, follower_id) => {
  const deleteQuery =
    "DELETE FROM followers WHERE follower_id = ? AND followee_id = ?";
  const deleteNotificationQuery =
    "DELETE FROM notifications WHERE sender_id = ? AND receiver_id = ? AND type = 'Sent you a follow request'";
  const insertNotificationQuery =
    "INSERT INTO notifications (sender_id, receiver_id, type) VALUES (?, ?, ' Rejected  your follow request')";

  await executeQuery(deleteQuery, [follower_id, id]);
  await executeQuery(deleteNotificationQuery, [follower_id, id]);
  await executeQuery(insertNotificationQuery, [id, follower_id]);
};

// Helper function to execute queries with error handling
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default acceptRejectFollowRequest;
