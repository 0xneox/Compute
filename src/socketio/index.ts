
import { Server } from 'socket.io';
import { verifyToken } from '../middleware/auth';

export const setupSocketIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"]
    }
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    const user = await verifyToken(token);
    if (!user) {
      return next(new Error('Authentication error'));
    }
    socket.data.user = user;
    next();
  });

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('tap', async (data) => {
      try {
        const user = await processTap(socket.data.user.telegramId, data.isOverclocked);
        socket.emit('tapResult', { compute: user.compute, xp: user.xp, gpuLevel: user.gpuLevel });
      } catch (error) {
        socket.emit('error', { message: 'Error processing tap' });
      }
    });

    // Add more real-time events here
  });

  return io;
};
