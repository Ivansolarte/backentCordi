//controlador envios
import {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipmentById,
  deleteShipmentById,
  getShipmentByOrden,
  getPendingShipmentsByUserId,
} from "../models/shipment.js";
import { v4 as uuidv4 } from "uuid";
import { createPackage } from "../models/package.js";
import { io, connectedUsers } from "../config/socket.js";
import { redisClient } from "../config/redis.js"; 

// get all
export const getAllShipmentsController = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const cacheKey = `shipments:all:status=${status || 'all'}:page=${page}:limit=${limit}`;

  try {
    const cachedShipments = await redisClient.get(cacheKey);
    if (cachedShipments) {
      return res.status(200).json({ shipments: JSON.parse(cachedShipments) });
    }

    getAllShipments({ status, page, limit }, async (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching shipments" });

      
      await redisClient.set(cacheKey, JSON.stringify(results), { EX: 60 * 5 });

      res.status(200).json({ shipments: results });
    });
  } catch (err) {
    console.error("❌ Error con Redis o getAllShipments:", err);
    res.status(500).json({ message: "Internal error" });
  }
};

//get No. orden publico
export const getShipmentsOrden = (req, res) => {
 
  const { id } = req.params;
  getShipmentByOrden(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error la busqueda" });
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
      return res
        .status(404)
        .json({ message: "Shipment not found", shipment: [] });
    }
    res.status(200).json({ shipments: results });
  });
};

// Crear
export const createShipmentController = (req, res) => {
  const order_umber = uuidv4();
  const {
    user_id,
    route_id,
    sender_name,
    sender_phone,
    shipment_address,
    status_actual,
    weight,
    width,
    height,
    product_type,
  } = req.body;

  if (
    !user_id ||
    !route_id ||
    !sender_name ||
    !sender_phone ||
    !shipment_address ||
    !status_actual ||
    !weight ||
    !width ||
    !height ||
    !product_type
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  const newShipment = {
    user_id,
    route_id,
    sender_name,
    sender_phone,
    shipment_address,
    status_actual,
    order_umber,
  };
  createShipment(newShipment,async (err, createdShipment) => {
    if (err) {
      return res.status(500).json({ message: "Error creating orden de envio" });
    }

    await redisClient.del('shipments:all:'); 

    const newPackage = {
      shipment_id: createdShipment.id,
      weight,
      width,
      height,
      product_type,
    };
    createPackage(newPackage, (err, createdPackage) => {
      if (err) {
        return res.status(500).json({ message: "Error creating paquete" });
      }
      return res.status(201).json({ shipment: createdShipment });
    });
  });
};

// Actualizar 
export const updateShipmentByIdController = async(req, res) => {
  await redisClient.del('shipments:all:'); 
  const io = req.app.get("io");
  const connectedUsers = req.app.get("connectedUsers");

  const { id } = req.params;
  const shipmentId = parseInt(id);

  const { user_id, route_id, carrier_id, status_actual } = req.body;

  updateShipmentById(shipmentId, req.body,async (err, result) => {
    await redisClient.del('shipments:all:'); 
    if (err) return res.status(500).json({ message: "Error updating shipment" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Shipment not found" });
    const userSocketId = connectedUsers.get(2); // ✅ usar user_id

    if (userSocketId) {
      getPendingShipmentsByUserId(userSocketId, async(err, pendingShipments) => {        
        await redisClient.del('shipments:all:'); 
        
        if (!err) {
          io.to(userSocketId).emit("shipmentStatusUpdated", pendingShipments); 
        } else {
          console.error("❌ Error trayendo envíos pendientes:", err);
        }
      });
    }

    await redisClient.ca; 
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
