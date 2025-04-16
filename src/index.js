// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import shipmentsRoutes from "./routes/shipmentsRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import carrierRoutes from "./routes/carrierRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import login from "./routes/authRoutes.js";
import { connectRedis } from './config/redis.js';

// Configurar variables de entorno
dotenv.config();  //////no estas funcionando 
await connectRedis(); //redis
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas de usuario
app.use("/api", userRoutes);
app.use("/api", shipmentsRoutes);
app.use("/api", packagesRoutes);
app.use("/api", carrierRoutes);
app.use("/api", routeRoutes);
app.use("/api", login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
