import swaggerUi from "swagger-ui-express";
import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
env.config({ path: "./.env" });
import router from "./index.js";
import cors from "cors";
import swagerData from "./swaggerData.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagerData));

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
