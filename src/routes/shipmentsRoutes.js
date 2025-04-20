//rutas envios
import express from "express";
import {
  getAllShipmentsController,
  getShipmentByIdController,
  createShipmentController,
  updateShipmentByIdController,
  deleteShipmentByIdController,
  getShipmentsOrden
} from "../controllers/shipmentsController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/shipments",authenticateJWT, getAllShipmentsController);
router.get("/shipments/:id", getShipmentByIdController);
router.get("/shipments/public/:id", getShipmentsOrden);//publico
router.post("/shipments",authenticateJWT, createShipmentController);
router.patch("/shipments/:id",authenticateJWT, updateShipmentByIdController);
router.delete("/shipments/:id",authenticateJWT, deleteShipmentByIdController);

export default router;
