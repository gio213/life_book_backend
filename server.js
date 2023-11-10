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
let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("New user connected with id: " + socket.id);
  // listen custom connection event
  socket.on("addUsers", (onlineUsers, userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    console.log(onlineUsers);
    socket.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("disconect", (userId) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    console.log(onlineUsers);
    socket.emit("disconect", onlineUsers);
    console.log("user disconnected");
  });
});
console.log(onlineUsers);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "https://lifebook-frontend.vercel.app",
    "http://localhost:5173",
    "https://jsonlink.io/",
  ],
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
