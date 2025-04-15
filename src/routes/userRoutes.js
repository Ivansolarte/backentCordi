// src/routes/userRoutes.js
import express from "express";
import {
  getAllUsersController,
  getUsersByIdController,
  createUserController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsersController);
router.get("/users/:id", getUsersByIdController);
router.post("/users", createUserController);
router.patch("/users/:id", updateUserByIdController);
router.delete("/users/:id", deleteUserByIdController);

export default router;
