import pool from "../../database/dbConnection.js";

const create_comment_by_post_id = (req, res) => {
  const { id } = req.decoded.user_id;
  const post_id = req.body.post_id;
  const comment = req.body.content;

  // First, retrieve the author's user_id for the post
  const getPostAuthorQuery = "SELECT user_id FROM posts WHERE post_id = ?";
  const postAuthorValues = [post_id];

  pool.query(
    getPostAuthorQuery,
    postAuthorValues,
    (postAuthorErr, postAuthorResult) => {
      if (postAuthorErr) {
        console.error(postAuthorErr);
        return res.status(500).json({ error: "Error retrieving post author" });
      }

      if (postAuthorResult.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      const postAuthorId = postAuthorResult[0].user_id;

      // Using parameterized queries to prevent SQL injection
      const insertCommentQuery =
        "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)";
      const commentValues = [post_id, id, comment];

      pool.getConnection((err, connection) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database connection error" });
        }

        connection.beginTransaction((transactionErr) => {
          if (transactionErr) {
            console.error(transactionErr);
            connection.release();
            return res.status(500).json({ error: "Transaction begin error" });
          }

          connection.query(
            insertCommentQuery,
            commentValues,
            (commentErr, commentResult) => {
              if (commentErr) {
                console.error(commentErr);
                connection.rollback(() => {
                  connection.release();
                  res.status(500).json({ error: "Comment insertion error" });
                });
              } else {
                // Check if the comment author is not the same as the post author
                if (id !== postAuthorId) {
                  const insertNotificationQuery = `INSERT INTO notifications (sender_id, receiver_id, post_id, type, created_at) VALUES (?, ?, ?, ?, ?)`;
                  const notificationValues = [
                    id,
                    postAuthorId,
                    post_id,
                    "Commented on your post",
                    new Date(),
                  ];

                  connection.query(
                    insertNotificationQuery,
                    notificationValues,
                    (notificationErr, notificationResult) => {
                      if (notificationErr) {
                        console.error(notificationErr);
                        connection.rollback(() => {
                          connection.release();
                          res
                            .status(500)
                            .json({ error: "Notification insertion error" });
                        });
                      } else {
                        connection.commit((commitErr) => {
                          if (commitErr) {
                            console.error(commitErr);
                            connection.rollback(() => {
                              connection.release();
                              res
                                .status(500)
                                .json({ error: "Transaction commit error" });
                            });
                          } else {
                            connection.release();
                            res.status(200).json({
                              message: "Comment created successfully",
                            });
                          }
                        });
                      }
                    }
                  );
                } else {
                  connection.commit((commitErr) => {
                    if (commitErr) {
                      console.error(commitErr);
                      connection.rollback(() => {
                        connection.release();
                        res
                          .status(500)
                          .json({ error: "Transaction commit error" });
                      });
                    } else {
                      connection.release();
                      res
                        .status(200)
                        .json({ message: "Comment created successfully" });
                    }
                  });
                }
              }
            }
          );
        });
      });
    }
  );
};

export default create_comment_by_post_id;
