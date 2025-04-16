import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRouteById,
  deleteRouteById,
} from "../models/route.js";

export const getAllRoutesController = (req, res) => {
  getAllRoutes((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching routes" });
    res.status(200).json({ routes: results });
  });
};

export const getRouteByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  getRouteById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching route" });
    if (results.length === 0)
      return res.status(404).json({ message: "Route not found" });

    res.status(200).json({ route: results[0] });
  });
};

export const createRouteController = (req, res) => {
  const { origin, destination, estimated_time } = req.body;
  if (!origin || !destination || !estimated_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRoute = { origin, destination, estimated_time };
  createRoute(newRoute, (err, created) => {
    if (err) return res.status(500).json({ message: "Error creating route" });
    res.status(201).json({ route: created });
  });
};

export const updateRouteByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  const { origin, destination, estimated_time } = req.body;

  if (!origin || !destination || !estimated_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  updateRouteById(id, { origin, destination, estimated_time }, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating route" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Route not found" });

    res.status(200).json({ message: "Route updated successfully" });
  });
};

export const deleteRouteByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  deleteRouteById(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting route" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Route not found" });

    res.status(200).json({ message: "Route deleted successfully" });
  });
};
