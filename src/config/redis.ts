import Redis from 'ioredis';
import logger from './logger';

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('error', (err: Error) => {
  logger.error('Redis error:', err);
});

export default redisClient;