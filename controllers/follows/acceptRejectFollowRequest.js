import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = (req, res) => {
  const {
    user_id: { id },
  } = req.decoded;
  const { follower_id, accepted } = req.body;
  console.log(id);
  if (accepted === "1") {
    const query = ` INSERT INTO followers (follower_id, followee_id, accepted)
VALUES (${id}, ${follower_id}, 1);
`;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Server error");
      } else {
        return res.status(200).json("Follow request accepted");
      }
    });
  } else {
    const query = ` DELETE FROM followers  where follower_id = ${follower_id} AND followee_id = ${id} `;
    pool.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Server error");
      } else {
        return res.status(200).json("Follow request rejected");
      }
    });
  }
};

export default acceptRejectFollowRequest;
