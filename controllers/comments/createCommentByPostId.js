import pool from "../../database/dbConnection.js";

const create_comment_by_post_id = (req, res) => {
  const { id } = req.decoded.user_id;
  const post_id = req.params.id;
  const comment = req.body.content;

  pool.query(
    `INSERT INTO comments (post_id, user_id, content) VALUES (${post_id}, ${id}, '${comment}')`,
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
