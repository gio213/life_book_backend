import { createServer } from "http";
import server from "socket.io";

export const configureSocketIO = (server) => {
  const io = createServer(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for a custom event from the client
    socket.on("chat message", (msg) => {
      console.log("Message: " + msg);
      // Broadcast the message to all connected clients
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export default configureSocketIO;
