import pool from "../../database/dbConnection.js";

const acceptRejectFollowRequest = (req, res) => {
  const { id } = req.decoded.user_id;
  const accepted = req.body.accepted;
  const request_id = req.params.requestID;
  console.log(id, accepted, request_id);
  /// get all from followers with request_id

  const query = `SELECT * FROM followers WHERE request_id = ${request_id}`;
  pool.query(query, (err, result) => {
    if (accepted === "1") {
      console.log("accepted");
      const query = `UPDATE followers SET accepted = ${accepted} WHERE request_id = ${request_id}`;
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.status(200).json({ message: "accepted" });
        }
      });
    } else {
      const query = `UPDATE followers SET accepted = ${accepted} WHERE request_id = ${request_id}`;
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.status(200).json({ message: "rejected" });
        }
      });
    }
  });
};

export default acceptRejectFollowRequest;
