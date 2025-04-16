// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import shipmentsRoutes from "./routes/shipmentsRoutes.js";
// import packagesRoutes from "./routes/packagesRoutes.js";

// Configurar variables de entorno
dotenv.config();  //////no estas funcionando 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar rutas de usuario
app.use("/api", userRoutes);
app.use("/api", shipmentsRoutes);
// app.use("/api", packagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
