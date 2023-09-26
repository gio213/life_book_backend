import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = (req, res) => {
  const request_id = req.body.request_id;
  const accepted = req.body.accepted;

  /// get all from follow request with request_id
  pool.query(
    "SELECT * FROM followers WHERE request_id = ?",
    request_id,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("Server error");
      }
      const follower_id = result[0].follower_id;
      const followee_id = result[0].followee_id;

      if (accepted === "1") {
        pool.query(
          "UPDATE followers SET accepted = ? WHERE request_id = ?",
          [accepted, request_id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json("Server error");
            }
            res.json({
              message: ` User ${followee_id} accepted follow request`,
            });
          }
        );
      } else if (accepted === "0") {
        pool.query(
          "UPDATE followers SET accepted = ? WHERE request_id = ?",
          [accepted, request_id],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json("Server error");
            }
            res.json({
              message: ` User ${followee_id} rejected follow request`,
            });
          }
        );
      }
    }
  );
};

export default acceptRejectFollowRequest;
