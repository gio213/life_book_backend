import pool from "../../database/dbConnection.js";

const edit_comment_by_comment_id = (req, res) => {
  const comment_id = req.params.id;
  const user_id = req.body.user_id;
  const editContent = req.body.content;
  console.log(editContent);
  console.log(typeof user_id);
  // check if user is author of comment
  // if not, return 403
  // if yes, edit comment

  pool.query(
    "select * from comments where comment_id = ?",
    [comment_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else {
        if (result.length > 0) {
          const comment = result[0];
          console.log(comment.user_id);
          if (comment.user_id === parseInt(user_id)) {
            console.log("true");
            pool.query(
              `UPDATE comments SET content = '${editContent}' WHERE comment_id = ${comment_id}`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ message: "Server error" });
                } else {
                  console.log(
                    `UPDATE comments SET content = '${editContent}' WHERE comment_id = ${comment_id}`
                  );
                  res.status(200).json({ message: "Comment edited" });
                }
              }
            );
          } else {
            res
              .status(403)
              .json({ message: "You are not author of this comment" });
          }
        } else {
          res.status(404).json({ message: "Comment not found" });
        }
      }
    }
  );
};

export default edit_comment_by_comment_id;
