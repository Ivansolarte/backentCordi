// src/routes/userRoutes.js
import express from "express";
import {
  getAllUsersController,
  getUsersByIdController,
  createUserController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users",  getAllUsersController);
router.get("/users/:id", authenticateJWT, getUsersByIdController);
router.post("/users", createUserController);
router.patch("/users/:id", authenticateJWT, updateUserByIdController);
router.delete("/users/:id", authenticateJWT, deleteUserByIdController);

export default router;
