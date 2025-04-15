
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../models/user.js";
//get total
export const getAllUsersController = (req, res) => {
  getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.status(200).json({ users: results });
  });
};
//buscar por id
export const getUsersByIdController = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  getUserById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching user by ID" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: results[0] });
  });
};
//para crear
export const createUserController = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = { name, email, password };
  createUser(newUser, (err, createdUser) => {
    if (err) {
      return res.status(500).json({ message: "Error creating user" });
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
  updateUserById(userId, { name, email, password }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
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
