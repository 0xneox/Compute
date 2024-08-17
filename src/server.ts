import http from 'http';
import app from './app';
import { setupSocketIO } from './socketio';
import logger from './config/logger';
import { setupCronJobs } from './cron/cronJobs';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

// Setup cron jobs
setupCronJobs();

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // In production, you might want to exit the process
  if (process.env.NODE_ENV === 'production') {
    server.close(() => process.exit(1));
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  // In production, you might want to exit the process
  if (process.env.NODE_ENV === 'production') {
    server.close(() => process.exit(1));
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    logger.info('Process terminated.');
  });
});