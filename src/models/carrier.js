import db from "../config/db.js";
import connection from "../config/db.js";

export const getAllCarriers = (callback) => {
  db.query("SELECT * FROM carriers", callback);
};

export const getCarrierById = (id, callback) => {
  db.query("SELECT * FROM carriers WHERE id = ?", [id], callback);
};

export const createCarrier = (carrier, callback) => {
  const { name, vehicle_capacity, is_available, vehicle_type, location } =
    carrier;
  connection.query(
    "INSERT INTO carriers (name, vehicle_capacity, is_available,vehicle_type,location) VALUES (?, ?, ?,?,?)",
    [name, vehicle_capacity, is_available, vehicle_type, location],
    callback
  );
};

export const updateCarrierById = (id, carrier, callback) => {
  const { name, vehicle_capacity, is_available, location, vehicle_type } =
    carrier;
    connection.query(
    "UPDATE carriers SET name = ?, vehicle_capacity = ?, is_available = ? , location = ?, vehicle_type = ? WHERE id = ?",
    [name, vehicle_capacity, is_available, location, vehicle_type, id],
    callback
  );
};

export const deleteCarrierById = (id, callback) => {
  db.query("DELETE FROM carriers WHERE id = ?", [id], callback);
};
