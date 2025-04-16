import db from "../config/db.js";

export const getAllCarriers = (callback) => {
  db.query("SELECT * FROM carriers", callback);
};

export const getCarrierById = (id, callback) => {
  db.query("SELECT * FROM carriers WHERE id = ?", [id], callback);
};

export const createCarrier = (carrier, callback) => {
  const { name, vehicle_capacity, is_available } = carrier;
  db.query(
    "INSERT INTO carriers (name, vehicle_capacity, is_available) VALUES (?, ?, ?)",
    [name, vehicle_capacity, is_available],
    callback
  );
};

export const updateCarrierById = (id, carrier, callback) => {
  const { name, vehicle_capacity, is_available } = carrier;
  db.query(
    "UPDATE carriers SET name = ?, vehicle_capacity = ?, is_available = ? WHERE id = ?",
    [name, vehicle_capacity, is_available, id],
    callback
  );
};

export const deleteCarrierById = (id, callback) => {
  db.query("DELETE FROM carriers WHERE id = ?", [id], callback);
};
