import jwt from 'jsonwebtoken';

// Clave secreta para firmar el JWT (usa una variable de entorno en producción)
const JWT_SECRET = '1234';
const JWT_EXPIRATION = '1h';  // El token expirará en 1 hora

// Función para generar un JWT
export const generateToken = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Función para verificar un JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};