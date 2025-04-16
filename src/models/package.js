// models/package
import connection from "../config/db.js";

// Consultar todos los paquetes
export const getAllPackages = (callback) => {
  const query = "SELECT * FROM packages";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching packages:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Consultar paquete por ID
export const getPackageById = (id, callback) => {
  const query = "SELECT * FROM packages WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

// Crear nuevo paquete
export const createPackage = (packageData, callback) => {
  const query = "INSERT INTO packages (shipment_id, weight, length, width, height, product_type) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    packageData.shipment_id,
    packageData.weight,
    packageData.length,
    packageData.width,
    packageData.height,
    packageData.product_type,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Error creating package:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, ...packageData });
  });
};

// Actualizar paquete
export const updatePackageById = (id, packageData, callback) => {
  const { weight, length, width, height, product_type } = packageData;
  const query =
    "UPDATE packages SET weight = ?, length = ?, width = ?, height = ?, product_type = ? WHERE id = ?";
  connection.query(query, [weight, length, width, height, product_type, id], (err, results) => {
    if (err) {
      console.error("❌ Error updating package:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Eliminar paquete
export const deletePackageById = (id, callback) => {
  const query = "DELETE FROM packages WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error deleting package:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};
