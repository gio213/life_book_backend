import pool from "../../database/dbConnection.js";

const delete_post_by_id = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const post_id = req.params.id;

  // first check post author is same as current user
  const checkPostAuthor = `SELECT * FROM posts WHERE post_id = ${post_id} AND user_id = ${id}`;
  pool.query(checkPostAuthor, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    if (results.length === 0) {
      return res.status(400).json({
        msg: "You can not delete this post because you are not the author of this post ",
      });
    } else {
      // delte post
      const deletePost = `DELETE from  posts WHERE post_id = ${post_id} AND user_id = ${id}`;
      pool.query(deletePost, (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        res.json({ msg: "Post deleted successfully" });
      });
    }
  });
};

export default delete_post_by_id;
