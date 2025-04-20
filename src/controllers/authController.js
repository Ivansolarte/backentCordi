// src/controllers/authController.js

import { authenticateUser } from "../services/authService.js";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos", estado: false });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido", estado: false });
  }

  authenticateUser(email, password, (err, result) => {
    if (err) return res.status(401).json({ message: err.message });
    res.json(result);
  });
};
