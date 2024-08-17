import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { createRateLimiter } from '../utils/rateLimiter';
import * as gameController from '../controllers/gameController';

const router = express.Router();

const tapLimiter = createRateLimiter(100, 60 * 1000); // 100 taps per minute

router.post('/tap', authMiddleware, tapLimiter, gameController.tap);
router.get('/status', authMiddleware, gameController.getGameStatus);

export default router;