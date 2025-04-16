//rutas envios
import express from "express";
import {
  getAllShipmentsController,
  getShipmentByIdController,
  createShipmentController,
  updateShipmentByIdController,
  deleteShipmentByIdController,
} from "../controllers/shipmentsController.js";

const router = express.Router();

router.get("/shipments", getAllShipmentsController);
router.get("/shipments/:id", getShipmentByIdController);
router.post("/shipments", createShipmentController);
router.patch("/shipments/:id", updateShipmentByIdController);
router.delete("/shipments/:id", deleteShipmentByIdController);

export default router;
