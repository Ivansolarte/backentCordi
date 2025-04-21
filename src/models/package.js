import db from "../config/db.js"; 


export const getAllPackages = (callback) => {
  db.query("SELECT * FROM packages", callback);
};


export const getPackageById = (id, callback) => {
  db.query("SELECT * FROM packages WHERE id = ?", [id], callback);
};


export const createPackage = (newPackage, callback) => {
 
  const {  shipment_id, weight, width, height, product_type } = newPackage;
  const query = `
    INSERT INTO packages (shipment_id, weight, width, height, product_type) 
    VALUES ( ?, ?, ?, ?, ?)
  `;
  db.query(query, [shipment_id, weight, width, height, product_type], callback);
};


export const updatePackageById = (id, updatedPackage, callback) => {
  const { shipment_id, weight, length, width, height, product_type } = updatedPackage;
  const query = `
    UPDATE packages 
    SET shipment_id = ?, weight = ?, length = ?, width = ?, height = ?, product_type = ? 
    WHERE id = ?
  `;
  db.query(query, [shipment_id, weight, length, width, height, product_type, id], callback);
};


export const deletePackageById = (id, callback) => {
  db.query("DELETE FROM packages WHERE id = ?", [id], callback);
};
