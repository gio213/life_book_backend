import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
env.config({ path: "./.env" });
import router from "./index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credentials: true,
};
app.use(cors(corsOptions));

app.use("/api", router);

let port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
