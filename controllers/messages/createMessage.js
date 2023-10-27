import pool from "../../database/dbConnection.js";

const create_message = async (req, res) => {
  const { id } = req.decoded.user_id;
  const { receiver_id, message_content } = req.body;

  const query = `INSERT INTO messages (sender_id, receiver_id, message_content, timestamp) VALUES (?, ?, ?, ?)`;
  const values = [id, receiver_id, message_content, new Date()];

  try {
    await new Promise((resolve, reject) => {
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).json({ message: "Message sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error sending message" });
  }
};

export default create_message;
