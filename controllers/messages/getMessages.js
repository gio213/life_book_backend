import pool from "../../database/dbConnection.js";

const get_messages = async (req, res) => {
  const { id } = req.decoded.user_id; // Current user ID
  const { user_id } = req.body;

  const query = `SELECT
  u.username,
  u.profile_picture,
  m.message_id,
  m.sender_id,
  m.receiver_id,
  m.message_content,
  m.timestamp,
  m.is_read,
  m.is_archived,
  m.is_deleted,
  m.attachment_url,
  m.conversation_id
FROM messages m
JOIN users u ON m.sender_id = u.user_id
WHERE (
  (m.sender_id = ? AND m.receiver_id = ?) OR
  (m.sender_id = ? AND m.receiver_id = ?)
)
`;
  pool.query(query, [id, user_id, user_id, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error getting messages" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "No  conversations found" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export default get_messages;
