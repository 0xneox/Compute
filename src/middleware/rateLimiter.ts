import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../app';
import logger from '../config/logger';

export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  if (!redisClient) {
    logger.error('Redis client is not initialized');
    throw new Error('Redis client is not initialized');
  }

  return rateLimit({
    store: new RedisStore({
      sendCommand: async (...args: any[]): Promise<any> => {
        try {
          return await redisClient.call(...args);
        } catch (error) {
          logger.error('Redis command error:', error);
          return null;
        }
      },
      prefix: 'rate_limit:',
    }),
    max: maxRequests,
    windowMs: windowMs,
    message: 'Too many requests, please try again later.',
    skip: () => !redisClient.status || redisClient.status !== 'ready',
    standardHeaders: true,
    legacyHeaders: false,
  });
};