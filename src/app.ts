import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import Redis from 'ioredis';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/database';
import logger from './config/logger';
import routes from './routes';
import './services/notificationService'; // Initialize Telegram bot

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redisClient = new Redis(redisUrl) as Redis.Redis;

redisClient.on('error', (err) => {
  logger.error('Redis error:', err);
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger documentation (only in development)
if (process.env.NODE_ENV !== 'production') {
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB().catch((err) => {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
});

// Log environment variables (be careful with sensitive information in production)
if (process.env.NODE_ENV !== 'production') {
  logger.info('Environment variables loaded:');
  logger.info(`PORT: ${process.env.PORT}`);
  logger.info(`MONGODB_URI: ${process.env.MONGODB_URI}`);
  logger.info(`REDIS_URL: ${process.env.REDIS_URL}`);
  logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.info(`TELEGRAM_BOT_TOKEN: ${process.env.TELEGRAM_BOT_TOKEN ? 'Set' : 'Not set'}`);
}

export default app;