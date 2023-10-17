import pool from "../../database/dbConnection.js";

const createPost = (req, res) => {
  const { id } = req.decoded.user_id;
  const { content } = req.body;
  const picture = req.file;

  let post_image = null;
  if (picture) {
    post_image = picture.path;
  }

  pool.query(
    "INSERT INTO posts (user_id, content, post_image) VALUES (?, ?, ?)",
    [id, content, post_image],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json({ message: "Post created" });
    }
  );
};

export default createPost;
