import db from "../config/db.js"; // Aquí debes importar tu configuración de conexión a la base de datos (MySQL, etc.)

// Obtener todos los paquetes
export const getAllPackages = (callback) => {
  db.query("SELECT * FROM packages", callback);
};

// Obtener un paquete por ID
export const getPackageById = (id, callback) => {
  db.query("SELECT * FROM packages WHERE id = ?", [id], callback);
};

// Crear un nuevo paquete
export const createPackage = (newPackage, callback) => {
  const { packageId, shipment_id, weight, length, width, height, product_type } = newPackage;
  const query = `
    INSERT INTO packages (id, shipment_id, weight, length, width, height, product_type) 
    VALUES (UUID(), ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [shipment_id, weight, length, width, height, product_type], callback);
};

// Actualizar un paquete por ID
export const updatePackageById = (id, updatedPackage, callback) => {
  const { shipment_id, weight, length, width, height, product_type } = updatedPackage;
  const query = `
    UPDATE packages 
    SET shipment_id = ?, weight = ?, length = ?, width = ?, height = ?, product_type = ? 
    WHERE id = ?
  `;
  db.query(query, [shipment_id, weight, length, width, height, product_type, id], callback);
};

// Eliminar un paquete por ID
export const deletePackageById = (id, callback) => {
  db.query("DELETE FROM packages WHERE id = ?", [id], callback);
};
