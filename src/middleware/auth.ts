import jwt from 'jsonwebtoken';
import User from '../models/User';

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { telegramId: string };
    const user = await User.findOne({ telegramId: decoded.telegramId });
    return user;
  } catch (error) {
    return null;
  }
};

export const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const user = await verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = user;
  next();
};