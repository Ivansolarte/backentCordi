import express from "express";
import {
  getAllCarriersController,
  getCarrierByIdController,
  createCarrierController,
  updateCarrierByIdController,
  deleteCarrierByIdController,
} from "../controllers/carrierController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/carriers", getAllCarriersController);
router.get("/carriers/:id", getCarrierByIdController);
router.post("/carriers", authenticateJWT, createCarrierController);
router.patch("/carriers/:id", updateCarrierByIdController);
router.delete("/carriers/:id", deleteCarrierByIdController);

export default router;

 
