import pool from "../../database/dbConnection.js";

const edit_comment = (req, res) => {
  const { id } = req.decoded.user_id;
  const comment_id = req.params.id;
  const { content } = req.body;
  const updatedDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format to 'YYYY-MM-DD HH:mm:ss'

  // first check post author is same as current user
  const checkPostAuthor = `SELECT * FROM comments WHERE comment_id = ${comment_id} AND user_id = ${id}`;
  pool.query(checkPostAuthor, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    if (results.length === 0) {
      return res.status(400).json({
        msg: "You can not edit this comment because you are not the author of this comment",
      });
    } else {
      // update post
      const updatePost = `UPDATE comments SET content = '${content}', created_at = '${updatedDate}' WHERE comment_id = ${comment_id} AND user_id = ${id}`;
      pool.query(updatePost, (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        res.json({ msg: "comment updated successfully" });
      });
    }
  });
};

export default edit_comment;
