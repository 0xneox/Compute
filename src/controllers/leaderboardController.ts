import { Request, Response } from 'express';
import * as leaderboardService from '../services/leaderboardService';
import { asyncHandler } from '../utils/asyncHandler';

export const getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getLeaderboard();
  res.json(leaderboard);
});

export const getUserRank = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const rank = await leaderboardService.getUserRank(req.user._id.toString());
  res.json({ rank });
});