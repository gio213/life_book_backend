import pool from "../../database/dbConnection.js";

const getNotifications = (req, res) => {
  const { id } = req.decoded.user_id;

  // get sender name and as sender name and sender profile picture
  const query = `
  SELECT
    notifications.notification_id,
    notifications.sender_id,
    notifications.receiver_id,
    notifications.type,
    notifications.created_at,
    notifications.seen,
    notifications.post_id,  -- Include the post_id in the query
    users.username AS sender_name,
    users.profile_picture AS sender_profile_picture
  FROM
    notifications
  JOIN
    users ON users.user_id = notifications.sender_id
  WHERE
    notifications.receiver_id = ${id}
  ORDER BY
    notifications.created_at DESC;
`;

  console.log(query);

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Server error");
    } else {
      return res.status(200).json(result);
    }
  });
};

export default getNotifications;
