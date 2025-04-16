import {
    getAllCarriers,
    getCarrierById,
    createCarrier,
    updateCarrierById,
    deleteCarrierById
  } from '../models/carrier.js';
  import { redisClient } from "../config/redis.js"; 
  
  // Obtener todos los carriers
  export const getAllCarriersController = async (req, res) => {
    try {
      const cachedCarriers = await redisClient.get('carriers:all');
      if (cachedCarriers) {
        return res.status(200).json({ carriers: JSON.parse(cachedCarriers) });
      }
  
      getAllCarriers(async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching carriers' });
  
        await redisClient.set('carriers:all', JSON.stringify(results), { EX: 300 }); // Caché por 5 minutos
        res.status(200).json({ carriers: results });
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal error' });
    }
  };
  
  // Obtener carrier por ID
  export const getCarrierByIdController = async (req, res) => {
    const { id } = req.params;
    const carrierId = parseInt(id);
    if (isNaN(carrierId)) {
      return res.status(400).json({ message: 'Invalid carrier ID' });
    }
  
    try {
      const cachedCarrier = await redisClient.get(`carrier:${carrierId}`);
      if (cachedCarrier) {
        return res.status(200).json({ carrier: JSON.parse(cachedCarrier) });
      }
  
      getCarrierById(carrierId, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching carrier by ID' });
        if (results.length === 0) return res.status(404).json({ message: 'Carrier not found' });
  
        await redisClient.set(`carrier:${carrierId}`, JSON.stringify(results[0]), { EX: 300 }); // Caché por 5 minutos
        res.status(200).json({ carrier: results[0] });
      });
    } catch (err) {
      res.status(500).json({ message: 'Internal error' });
    }
  };
  
  // Crear un nuevo carrier
  export const createCarrierController = (req, res) => {
    const { name, vehicle_capacity, is_available } = req.body;
    if (!name || vehicle_capacity == null || is_available == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const newCarrier = { name, vehicle_capacity, is_available };
  
    createCarrier(newCarrier, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating carrier' });
  
      await redisClient.del('carriers:all'); // Limpiar caché
      res.status(201).json({ message: 'Carrier created successfully', carrierId: result.insertId });
    });
  };
  
  // Actualizar un carrier por ID
  export const updateCarrierByIdController = (req, res) => {
    const { id } = req.params;
    const carrierId = parseInt(id);
    if (isNaN(carrierId)) {
      return res.status(400).json({ message: 'Invalid carrier ID' });
    }
  
    const { name, vehicle_capacity, is_available } = req.body;
    if (!name || vehicle_capacity == null || is_available == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const updatedCarrier = { name, vehicle_capacity, is_available };
  
    updateCarrierById(carrierId, updatedCarrier, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating carrier' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrier not found' });
  
      await redisClient.del('carriers:all');
      await redisClient.del(`carrier:${carrierId}`);
      res.status(200).json({ message: 'Carrier updated successfully' });
    });
  };
  
  // Eliminar un carrier por ID
  export const deleteCarrierByIdController = (req, res) => {
    const { id } = req.params;
    const carrierId = parseInt(id);
    if (isNaN(carrierId)) {
      return res.status(400).json({ message: 'Invalid carrier ID' });
    }
  
    deleteCarrierById(carrierId, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Error deleting carrier' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrier not found' });
  
      await redisClient.del('carriers:all');
      await redisClient.del(`carrier:${carrierId}`);
      res.status(200).json({ message: 'Carrier deleted successfully' });
    });
  };
  