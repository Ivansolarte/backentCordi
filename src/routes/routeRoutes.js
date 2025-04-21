import express from "express";
import {
  getAllRoutesController,
  getRouteByIdController,
  createRouteController,
  updateRouteByIdController,
  deleteRouteByIdController,
} from "../controllers/routeController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/routes",authenticateJWT, getAllRoutesController);
router.get("/routes/:id", getRouteByIdController);
router.post("/routes", authenticateJWT, createRouteController);
router.patch("/routes/:id", updateRouteByIdController);
router.delete("/routes/:id", deleteRouteByIdController);

export default router;

