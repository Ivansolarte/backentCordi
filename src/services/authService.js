// src/services/authService.js

import connection from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = "1234";
const JWT_EXPIRATION = '1h';

export const authenticateUser = (email, password, callback) => {
    console.log(email, password,"service");
    
  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], (err, results) => {
    if (err) {
      return callback({
        status: 500,
        message: 'Error en la base de datos',
        estado: false
      }, null);
    }

    const user = results[0];
    console.log(user);
    
    if (!user) {
        return callback({
            status: 404,
            message: 'El usuario con ese correo no existe',
            estado: false
        }, null);
    }
    
    console.log(user.password,"<==1");
    console.log(password,"<==2");

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return callback({
        status: 401,
        message: 'Contraseña inválida',
        estado: false
      }, null);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    callback(null, {
      status: 200,
      message: 'Inicio de sesión exitoso',
      estado: true,
      token,
      user
    });
  });
};
