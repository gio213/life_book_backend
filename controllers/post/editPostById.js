import pool from "../../database/dbConnection.js";

const edit_post_by_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.params.id;
  console.log(post_id);
  const { content } = req.body;
  const updatedDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format to 'YYYY-MM-DD HH:mm:ss'

  // first check post author is same as current user
  const checkPostAuthor = `SELECT * FROM posts WHERE post_id = ${post_id} AND user_id = ${id}`;
  pool.query(checkPostAuthor, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    if (results.length === 0) {
      return res.status(400).json({
        msg: "You can not edit this post because you are not the author of this post",
      });
    } else {
      // update post
      const updatePost = `UPDATE posts SET content = '${content}', created_at = '${updatedDate}' WHERE post_id = ${post_id} AND user_id = ${id}`;
      pool.query(updatePost, (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        res.json({ msg: "post updated successfully" });
      });
    }
  });
};

export default edit_post_by_id;
