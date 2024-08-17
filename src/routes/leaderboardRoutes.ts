
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as leaderboardController from '../controllers/leaderboardController';

const router = express.Router();

router.get('/', authMiddleware, leaderboardController.getLeaderboard);
router.get('/user-rank', authMiddleware, leaderboardController.getUserRank);

export default router;