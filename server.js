import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./actions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return { socketId, userName: userSocketMap[socketId] };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket connected ", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    console.log(`${userName} joined the room ${roomId}`);

    const clients = getAllConnectedClients(roomId);
  });
  socket.on(ACTIONS.DISCONNECTED, () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
