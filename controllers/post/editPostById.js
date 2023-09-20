import pool from "../../database/dbConnection.js";

const edit_post_by_id = (req, res) => {
  const id = req.params.id;
  const { content, created_at } = req.body;
  const post = {
    content,
    created_at: new Date(),
  };
  try {
    const result = pool.query(`UPDATE posts SET ? WHERE post_id = ${id}`, post);
    res.status(200).json("Post updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

export default edit_post_by_id;
