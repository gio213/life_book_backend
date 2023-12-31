import pool from "../../database/dbConnection.js";

const get_messages = async (req, res) => {
  const { id } = req.decoded.user_id; // Current user ID
  console.log(id);
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
      res.status(500).json({ error: "Something went wrong" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
};

export default get_messages;
