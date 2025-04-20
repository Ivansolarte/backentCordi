// src/config/redis.js
import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));

export const connectRedis = async () => {
  await redisClient.connect();
};