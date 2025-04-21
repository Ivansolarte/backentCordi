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

router.get("/carriers",authenticateJWT, getAllCarriersController);
router.get("/carriers/:id",authenticateJWT,  getCarrierByIdController);
router.post("/carriers", authenticateJWT,  createCarrierController);
router.patch("/carriers/:id",authenticateJWT,  updateCarrierByIdController);
router.delete("/carriers/:id",authenticateJWT,  deleteCarrierByIdController);

export default router;

 
