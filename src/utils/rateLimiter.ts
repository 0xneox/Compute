
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../app';

export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.call(...args)
    }),
    max: maxRequests,
    windowMs: windowMs,
    message: 'Too many requests, please try again later.'
  });
};