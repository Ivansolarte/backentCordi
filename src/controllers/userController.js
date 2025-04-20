// useController
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../models/user.js";

import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../config/redis.js";

//get total
export const getAllUsersController = async (req, res) => {
  try {
    const cachedUsers = await redisClient.get("users:all");
    if (cachedUsers) {
      
      return res.status(200).json({ users: JSON.parse(cachedUsers) });
    }
    getAllUsers(async (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching users" });
      await redisClient.set("users:all", JSON.stringify(results), {
        EX: 60 * 5,
      });

      res.status(200).json({ users: results });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};

//buscar por id
export const getUsersByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
     
      return res.status(200).json({ user: JSON.parse(cachedUser) });
    }

    getUserById(userId, async (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error fetching user by ID" });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });

      const user = results[0];
      await redisClient.set(`user:${userId}`, JSON.stringify(user), {
        EX: 60 * 5,
      });

      res.status(200).json({ user });
    });
  } catch (error) {
    console.error("❌ Redis error:", error);
    res.status(500).json({ message: "Internal error" });
  }

  // getUserById(userId, (err, results) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Error fetching user by ID" });
  //   }
  //   if (results.length === 0) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   res.status(200).json({ user: results[0] });
  // });
};

//para crear
export const createUserController = (req, res) => {
  const { name, email, password } = req.body;

    if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  
  if (name.length > 100 || email.length > 100 || password.length > 100) {
    return res
      .status(400)
      .json({ message: "Los campos no deben superar los 100 caracteres" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido" });
  }

 
  const cleanName = name.toLowerCase();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim().toLowerCase(); 

  const userId = uuidv4();
  const newUser = {
    userId,
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword, // Idealmente aquí deberías encriptarla
  };

  createUser(newUser,  (err, createdUser) => {
    if (err) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }

    res.status(201).json({ user: createdUser });
  });
};

// para actualizar
export const updateUserByIdController = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields (name, email, password) are required" });
  }
  // accion para actualizar
  updateUserById(userId, { name, email, password }, async(err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    await redisClient.delPattern("users:all:*");
    res.status(200).json({ message: "User updated successfully" });
  });
};

// para eliminar
export const deleteUserByIdController = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  deleteUserById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
