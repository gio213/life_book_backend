import pool from "../../database/dbConnection.js";

const createPost = (req, res) => {
  const { content, user_id } = req.body;
  const newPost = {
    content,
    user_id,
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
