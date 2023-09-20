import pool from "../../database/dbConnection.js";

const delete_post_by_id = async (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM posts WHERE post_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json("Post not found");
      } else {
        res.status(200).json("Post deleted successfully");
      }
    }
  });
};

export default delete_post_by_id;
