import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const generateJwtToken = (user_id) => {
  const token = Jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
export default generateJwtToken;
