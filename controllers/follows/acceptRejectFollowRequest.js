import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = (req, res) => {
  const {
    user_id: { id },
  } = req.decoded;
  const { follower_id, accepted } = req.body;
  console.log(id);

  if (accepted === "1") {
    const updateQuery = `UPDATE followers SET accepted = 1 WHERE follower_id = ${follower_id} AND followee_id = ${id}`;
    const query = `INSERT INTO followers (follower_id, followee_id, accepted) VALUES (${id}, ${follower_id}, 1);`;

    pool.query(updateQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Server error");
      } else {
        pool.query(query, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Server error");
          } else {
            // Remove the notification row for the accepted request
            const deleteNotificationQuery = `DELETE FROM notifications WHERE sender_id = ${follower_id} AND receiver_id = ${id} AND type = 'follow request';`;

            pool.query(deleteNotificationQuery, (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).json("Server error");
              } else {
                return res.status(200).json("Follow request accepted");
              }
            });
          }
        });
      }
    });
  } else {
    const query = `DELETE FROM followers WHERE follower_id = ${follower_id} AND followee_id = ${id}`;

    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Server error");
      } else {
        // Remove the notification row for the rejected request
        const deleteNotificationQuery = `DELETE FROM notifications WHERE sender_id = ${follower_id} AND receiver_id = ${id} AND type = 'follow request';`;

        pool.query(deleteNotificationQuery, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json("Server error");
          } else {
            return res.status(200).json("Follow request rejected");
          }
        });
      }
    });
  }
};

export default acceptRejectFollowRequest;
