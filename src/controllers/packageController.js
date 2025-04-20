import {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackageById,
    deletePackageById,
  } from "../models/package.js";
  import { v4 as uuidv4 } from 'uuid';
  
  // Obtener todos los paquetes
  export const getAllPackagesController = (req, res) => {
    getAllPackages((err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching packages" });
      }
      res.status(200).json({ packages: results });
    });
  };
  
  // Buscar paquete por ID
  export const getPackageByIdController = (req, res) => {
    const { id } = req.params;
    const packageId = parseInt(id);
    if (isNaN(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }
    getPackageById(packageId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching package by ID" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.status(200).json({ package: results[0] });
    });
  };
  
  // Crear nuevo paquete usuario
  export const createPackageController = (req, res) => {
    const { shipment_id, weight, length, width, height, product_type } = req.body;
    if (!shipment_id || !weight || !length || !width || !height || !product_type) {
      return res.status(400).json({ message: "All fields are required (shipment_id, weight, length, width, height, product_type)" });
    }
    const packageId = uuidv4();
    const newPackage = { packageId, shipment_id, weight, length, width, height, product_type };
    
    createPackage(newPackage, (err, createdPackage) => {
      if (err) {
        return res.status(500).json({ message: "Error creating package" });
      }
      res.status(201).json({ package: createdPackage });
    });
  };
  
  // Actualizar paquete por ID
  export const updatePackageByIdController = (req, res) => {
    const { id } = req.params;
    const packageId = parseInt(id);
    if (isNaN(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }
    const { shipment_id, weight, length, width, height, product_type } = req.body;
    if (!shipment_id || !weight || !length || !width || !height || !product_type) {
      return res.status(400).json({ message: "All fields (shipment_id, weight, length, width, height, product_type) are required" });
    }
  
    updatePackageById(packageId, { shipment_id, weight, length, width, height, product_type }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating package" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.status(200).json({ message: "Package updated successfully" });
    });
  };
  
  // Eliminar paquete por ID
  export const deletePackageByIdController = (req, res) => {
    const { id } = req.params;
    const packageId = parseInt(id);
    if (isNaN(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }
    deletePackageById(packageId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting package" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.status(200).json({ message: "Package deleted successfully" });
    });
  };
  