// config/socket.js

import { Server } from "socket.io";
let io;
const connectedUsers = new Map(); 

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    socket.on("registerUser", (userId) => {
        
      connectedUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

export { io, connectedUsers };
