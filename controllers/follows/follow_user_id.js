import pool from "../../database/dbConnection.js";

const followUserId = async (req, res) => {
  try {
    const { id } = req.decoded.user_id;
    const followee = req.body.followee;

    if (!followee) {
      return res.status(400).json({ error: "Invalid 'followee' ID" });
    }

    const sql = `INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)`;
    await pool.query(sql, [id, followee]);

    res
      .status(200)
      .json(`User ${id} sent a follow request to user ${followee}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default followUserId;
