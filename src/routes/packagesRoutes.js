import express from "express";
import {
  getAllPackagesController,
  getPackageByIdController,
  createPackageController,
  updatePackageByIdController,
  deletePackageByIdController,
} from "../controllers/packageController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas para paquetes
router.get("/packages", authenticateJWT, getAllPackagesController);
router.get("/packages/:id", authenticateJWT, getPackageByIdController);
router.post("/packages", authenticateJWT, createPackageController);
router.patch("/packages/:id", authenticateJWT, updatePackageByIdController);
router.delete("/packages/:id", authenticateJWT, deletePackageByIdController);

export default router;
