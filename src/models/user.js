//src/models/user.js
import connection from "../config/db.js";

// consultas toda la tabla user
export const getAllUsers = (callback) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching users:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// consulta por ID
export const getUserById = (id, callback) => {
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

// Función para crear un nuevo usuario
export const createUser = (userData, callback) => {
  const query =
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
  const values = [
    userData.userId,
    userData.name,
    userData.email,
    userData.password,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Error creating user:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, ...userData });
  });
};
// consulta para actualizar
export const updateUserById = (id, userData, callback) => {
  const { name, email, password } = userData;
  const query =
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  connection.query(query, [name, email, password, id], (err, results) => {
    if (err) {
      console.error("❌ Error updating user:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};
//consul;ta para eliminar
export const deleteUserById = (id, callback) => {
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error deleting user:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};
