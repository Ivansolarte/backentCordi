// src/controllers/authController.js

import { authenticateUser } from '../services/authService.js';

export const login = (req, res) => {
  const { email, password } = req.body;  

  authenticateUser(email, password, (err, result) => {    
    if (err) return res.status(401).json({ message: err.message });   
    res.json(result);
  });
};
