import pool from "../../database/dbConnection.js";

const delete_comment_by_id = (req, res) => {
  const comment_id = req.params.id;
  const { id } = req.decoded.user_id;

  // check if comment author is the same as the user who wants to delete it
  const checkCommentAuthor = `
    SELECT user_id FROM comments WHERE comment_id = ${comment_id}
  `;
  pool.query(checkCommentAuthor, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    } else {
      if (result[0].user_id === id) {
        // delete comment
        const deleteComment = `
          DELETE FROM comments WHERE comment_id = ${comment_id}
        `;
        pool.query(deleteComment, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
          } else {
            res.status(200).json({ message: "Comment deleted" });
          }
        });
      } else {
        res
          .status(403)
          .json({
            message:
              "You can not delete this comment because you are not the author of it",
          });
      }
    }
  });
};

export default delete_comment_by_id;
