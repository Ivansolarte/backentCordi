//models/envios
import connection from "../config/db.js";

// Obtener todos los envíos
export const getAllShipments = (callback) => {
  const query = "SELECT * FROM shipments";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching shipments:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Obtener un envío por ID
export const getShipmentById = (id, callback) => {
  const query = "SELECT * FROM shipments WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

// Crear un nuevo envío
export const createShipment = (shipmentData, callback) => {
  const query =
    "INSERT INTO shipments (user_id, route_id, carrier_id, status_actual) VALUES (?, ?, ?, ?)";
  const values = [
    shipmentData.user_id,
    shipmentData.route_id,
    shipmentData.carrier_id,
    shipmentData.status_actual,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Error creating shipment:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, ...shipmentData });
  });
};

// Actualizar un envío
export const updateShipmentById = (id, shipmentData, callback) => {
  const { user_id, route_id, carrier_id, status_actual } = shipmentData;
  const query =
    "UPDATE shipments SET user_id = ?, route_id = ?, carrier_id = ?, status_actual = ? WHERE id = ?";
  connection.query(query, [user_id, route_id, carrier_id, status_actual, id], (err, results) => {
    if (err) {
      console.error("❌ Error updating shipment:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Eliminar un envío
export const deleteShipmentById = (id, callback) => {
  const query = "DELETE FROM shipments WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error deleting shipment:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};
