import pool from "../../database/dbConnection.js";

const createPost = (req, res) => {
  const { id } = req.decoded.user_id;
  console.log(id);
  const { content } = req.body;
  const newPost = {
    content,
    user_id: id,
  };
  try {
    const result = pool.query("INSERT INTO posts SET ?", newPost);
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default createPost;
