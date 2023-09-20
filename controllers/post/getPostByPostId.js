import pool from "../../database/dbConnection.js";

const get_post_by_post_id = (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM posts WHERE post_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json("Server error");
    } else {
      if (result.length === 0) {
        res.status(404).json("Post not found");
      } else {
        res.status(200).json(result);
      }
    }
  });
};

export default get_post_by_post_id;
