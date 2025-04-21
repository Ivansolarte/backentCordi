import pool from "../config/db.js";
import connection from "../config/db.js";
import { redisClient } from "../config/redis.js";

export const getAllRoutes = async (callback) => {



  const query = "SELECT * FROM routes";
  connection.query(query, (err, results) => {

    
    if (err) return callback(err);
    redisClient.set("routes:all", JSON.stringify(results));
    callback(null, results);
  });
};

export const getRouteById = async (id, callback) => {
  const cached = await redisClient.get(`routes:${id}`);
  if (cached) return callback(null, JSON.parse(cached));

  pool.query("SELECT * FROM routes WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      redisClient.set(`routes:${id}`, JSON.stringify(results[0]));
    }
    callback(null, results);
  });
};

export const createRoute = (route, callback) => {
  const { origin, destination, estimated_time } = route;
  pool.query(
    "INSERT INTO routes (origin, destination, estimated_time) VALUES (?, ?, ?)",
    [origin, destination, estimated_time],
    (err, result) => {
      if (err) return callback(err);
      redisClient.del("routes:all"); // Clear cache
      callback(null, { id: result.insertId, ...route });
    }
  );
};

export const updateRouteById = (id, route, callback) => {
  const { origin, destination, estimated_time } = route;
  pool.query(
    "UPDATE routes SET origin = ?, destination = ?, estimated_time = ? WHERE id = ?",
    [origin, destination, estimated_time, id],
    (err, result) => {
      if (err) return callback(err);
      redisClient.del("routes:all");
      redisClient.del(`routes:${id}`);
      callback(null, result);
    }
  );
};

export const deleteRouteById = (id, callback) => {
  pool.query("DELETE FROM routes WHERE id = ?", [id], (err, result) => {
    if (err) return callback(err);
    redisClient.del("routes:all");
    redisClient.del(`routes:${id}`);
    callback(null, result);
  });
};
