import pool from "../../database/dbConnection.js";

const get_feed_for_auth_user = async (req, res) => {
  const { id } = req.decoded.user_id;
  const query = `
  -- Query to retrieve posts from users who are followers of a specific user
SELECT posts.*
FROM followers
JOIN posts ON followers.follower_id = posts.user_id
WHERE followers.followee_id = ${id}
  AND followers.accepted = TRUE

UNION  -- Use UNION to combine results

-- Query to retrieve posts from users who are being followed by a specific user
SELECT posts.*
FROM followers
JOIN posts ON followers.followee_id = posts.user_id
WHERE followers.follower_id = ${id}
  AND followers.accepted = TRUE

ORDER BY created_at DESC;  -- Order the combined result by created_at


  `;
  console.log(query);
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      console.log(query);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      res.status(200).json({ message: "Posts from you follow", result });
    }
  });
};

export default get_feed_for_auth_user;
