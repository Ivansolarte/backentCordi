//controlador envios
import {
    getAllShipments,
    getShipmentById,
    createShipment,
    updateShipmentById,
    deleteShipmentById,
  } from "../models/shipment.js";
  
  // Obtener todos los envíos
  export const getAllShipmentsController = (req, res) => {
    getAllShipments((err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching shipments" });
      }
      res.status(200).json({ shipments: results });
    });
  };
  
  // Obtener un envío por ID
  export const getShipmentByIdController = (req, res) => {
    const { id } = req.params;
    const shipmentId = parseInt(id);
    if (isNaN(shipmentId)) {
      return res.status(400).json({ message: "Invalid shipment ID" });
    }
    getShipmentById(shipmentId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching shipment by ID" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json({ shipment: results[0] });
    });
  };
  
  // Crear un nuevo envío
  export const createShipmentController = (req, res) => {
    const { user_id, route_id, carrier_id, status_actual } = req.body;
    if (!user_id || !route_id || !carrier_id || !status_actual) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newShipment = { user_id, route_id, carrier_id, status_actual };
    createShipment(newShipment, (err, createdShipment) => {
      if (err) {
        return res.status(500).json({ message: "Error creating shipment" });
      }
      res.status(201).json({ shipment: createdShipment });
    });
  };
  
  // Actualizar un envío
  export const updateShipmentByIdController = (req, res) => {
    const { id } = req.params;
    const shipmentId = parseInt(id);
    if (isNaN(shipmentId)) {
      return res.status(400).json({ message: "Invalid shipment ID" });
    }
    const { user_id, route_id, carrier_id, status_actual } = req.body;
    if (!user_id || !route_id || !carrier_id || !status_actual) {
      return res.status(400).json({ message: "All fields are required" });
    }
    updateShipmentById(shipmentId, { user_id, route_id, carrier_id, status_actual }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating shipment" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json({ message: "Shipment updated successfully" });
    });
  };
  
  // Eliminar un envío
  export const deleteShipmentByIdController = (req, res) => {
    const { id } = req.params;
    const shipmentId = parseInt(id);
    if (isNaN(shipmentId)) {
      return res.status(400).json({ message: "Invalid shipment ID" });
    }
    deleteShipmentById(shipmentId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting shipment" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json({ message: "Shipment deleted successfully" });
    });
  };
  
