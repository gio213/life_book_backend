import e from "express";
import pool from "../../database/dbConnection.js";

const get_messages = async (req, res) => {
  const { id } = req.decoded.user_id;
  const { receiver_id } = req.body;

  const query = `SELECT u.username, u.profile_picture, m.message_id, m.sender_id, m.receiver_id, m.message_content, m.timestamp, m.is_read, m.is_archived, m.is_deleted, m.attachment_url, m.conversation_id
FROM messages m
JOIN users u ON m.sender_id = u.user_id;
`;
  const values = [id, receiver_id];

  try {
    const result = await new Promise((resolve, reject) => {
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error getting messages" });
  }
};
export default get_messages;
