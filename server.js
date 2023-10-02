import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
env.config({ path: "./.env" });
import router from "./index.js";
import cors from "cors";
import swagerData from "./swaggerData.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOptions));

app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagerData));

let port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
