import connection from "../config/db.js";

//  todos
export const getAllShipments = ({ status, page = 1, limit = 5 }, callback) => {
  let query = `
    SELECT
      shipments.id AS shipment_id,
      shipments.user_id,
      shipments.route_id,
      shipments.carrier_id,
      shipments.status_actual,
      shipments.created_at,
      shipments.updated_at,
      shipments.sender_name,
      shipments.sender_phone,
      shipments.shipment_address,
      shipments.order_number,
      GROUP_CONCAT(packages.id) AS package_ids,
      GROUP_CONCAT(packages.weight) AS package_weights,
      GROUP_CONCAT(packages.length) AS package_lengths,
      GROUP_CONCAT(packages.width) AS package_widths,
      GROUP_CONCAT(packages.height) AS package_heights,
      GROUP_CONCAT(packages.product_type) AS package_types
    FROM
      shipments
    LEFT JOIN
      packages ON shipments.id = packages.shipment_id
    WHERE 1 = 1
  `;

  const params = [];

  if (status) {
    query += " AND shipments.status_actual = ?";
    params.push(status);
  }

  query += `
    GROUP BY shipments.id
    ORDER BY shipments.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const offset = (page - 1) * limit;
  params.push(limit, offset);

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching shipments:", err);
      return callback(err, null);
    }

    callback(null, results);
  });
};

// envío por ID
export const getShipmentById = (id, callback) => {
  const query = "SELECT * FROM shipments WHERE user_id = ?";
  connection.query(query, [id], (err, results) => {

    callback(err, results);
  });
};

export const getShipmentByOrden = (id, callback) => {
  const query = "SELECT * FROM shipments WHERE order_number = ?";
  connection.query(query, [id], (err, results) => {
    callback(err, results);
  });
};

// crear
export const createShipment = (shipmentData, callback) => {
  const query =
    "INSERT INTO shipments (user_id, route_id, sender_name, sender_phone, shipment_address, status_actual,order_number) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    shipmentData.user_id,
    shipmentData.route_id,
    shipmentData.sender_name,
    shipmentData.sender_phone,
    shipmentData.shipment_address,
    shipmentData.status_actual,
    shipmentData.order_umber,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(" Error creating shipment:", err);
      return callback(err, null);
    }
    callback(null, { id: result.insertId, ...shipmentData });
  });
};

// actualizar
export const updateShipmentById = (id, shipmentData, callback) => {
  const { user_id, route_id, carrier_id, status_actual } = shipmentData;
  const query =
    "UPDATE shipments SET user_id = ?, route_id = ?, carrier_id = ?, status_actual = ? WHERE id = ?";
  connection.query(
    query,
    [user_id, route_id, carrier_id, status_actual, id],
    (err, results) => {
      if (err) {
        console.error(" Error updating shipment:", err);
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// eliminar
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

export const getPendingShipmentsByUserId = (userId, callback) => {
  const sql = `SELECT * FROM shipments WHERE user_id = ? AND status_actual != 'Entregado'`;
  connection.query(sql, [userId], callback);
};
