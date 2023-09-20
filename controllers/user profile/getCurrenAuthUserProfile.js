import pool from "../../database/dbConnection.js";

const getCurrenAuthUserProfile = (req, res) => {
  //   const id = req.user.user_id;
  const { id } = req.decoded.user_id;
  console.log(id);
  pool.query(
    "select * from users WHERE user_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(400).json({ message: "User does not exist" });
      }
    }
  );
};

export default getCurrenAuthUserProfile;
