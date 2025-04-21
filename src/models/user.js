
import connection from "../config/db.js";
import bcrypt from 'bcryptjs';


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


export const getUserById = (id, callback) => {
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    callback(err, results);
  });
};


export const createUser = (userData, callback) => {
  
  try {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [
      userData.name.toLowerCase(),
      userData.email.trim().toLowerCase(),
      hashedPassword,
      "usuario",
    ];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Error creating user:", err);
        return callback(err, null);
      }

      callback(null, {
        id: result.insertId,
        name: userData.name,
        email: userData.email,
      });
    });
  } catch (error) {
    callback(error, null);
  }
};


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
