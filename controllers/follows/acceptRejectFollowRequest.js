import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = (req, res) => {
  const { id } = req.decoded.user_id;
  const { followerId, action } = req.body; // Assuming you send the follower's ID and action (accept or reject) in the request body

  if (action === "1") {
    // Accept the follow request
    const acceptQuery = `
      UPDATE followers
      SET accepted = 1
      WHERE follower_id = ${followerId}
        AND followee_id = ${id};
    `;

    pool.query(acceptQuery, [followerId, id], (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Respond with a success message for acceptance
      res.json({ message: "Follow request accepted" });
    });
  } else if (action === "0") {
    // Reject the follow request
    const rejectQuery = `
      DELETE FROM followers
      WHERE follower_id = ${followerId}
        AND followee_id = ${id};
    `;

    pool.query(rejectQuery, [followerId, id], (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Respond with a success message for rejection
      res.json({ message: "Follow request rejected" });
    });
  } else {
    // Handle invalid or unsupported actions
    res.status(400).json({ error: "Invalid action" });
  }
};

export default acceptRejectFollowRequest;
