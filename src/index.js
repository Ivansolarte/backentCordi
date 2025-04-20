import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import shipmentsRoutes from "./routes/shipmentsRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import carrierRoutes from "./routes/carrierRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import login from "./routes/authRoutes.js";
import { connectRedis } from "./config/redis.js";
import http from "http";
import { Server } from "socket.io";


dotenv.config();

// conectar a Redis
await connectRedis();


const app = express();
const server = http.createServer(app);

// socket
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  socket.on("registerUser", (userId) => {
    console.log(`Usuario ${userId} registrado con socket ${socket.id}`);
    connectedUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

app.set("io", io);
app.set("connectedUsers", connectedUsers);

// Middleware
const corsConfig = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsConfig));
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api", shipmentsRoutes); // aquí se notificará
app.use("/api", packagesRoutes);
app.use("/api", carrierRoutes);
app.use("/api", routeRoutes);
app.use("/api", login);


// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`=>> Servidor corriendo en http://localhost:${PORT}<==`);
});
