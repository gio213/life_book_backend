import pool from "../../database/dbConnection.js";

const create_comment_by_post_id = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.body.user_id;
  const comment = req.body.content;
  console.log(post_id, user_id, comment);

  pool.query(
    `INSERT INTO comments (post_id, user_id, content) VALUES (${post_id}, ${user_id}, '${comment}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else {
        res.status(200).json({ message: "Comment created" });
      }
    }
  );
};

export default create_comment_by_post_id;
