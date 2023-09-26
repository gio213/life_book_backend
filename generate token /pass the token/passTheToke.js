import jwt from "jsonwebtoken";
const passToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    console.log("No token found");
    res.json({ message: "No token found" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Invalid token");
        console.log(token);
        res.json({ message: "Invalid token" });
      } else {
        req.decoded = decoded;
        console.log(req.decoded);
        console.log("Token passed");
        next();
      }
    });
  }
};

export default passToken;
