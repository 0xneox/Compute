
import { Request, Response } from 'express';
import * as gameService from '../services/gameService';

export const tap = async (req: Request, res: Response) => {
  try {
    const { isOverclocked } = req.body;
    const user = await gameService.processTap(req.user.telegramId, isOverclocked);
    res.json({
      compute: user.compute,
      xp: user.xp,
      gpuLevel: user.gpuLevel
    });
  } catch (error) {
    res.status(400).json({ message: 'Error processing tap', error });
  }
};

export const getGameStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const cooldown = await gameService.checkCooldown(user.telegramId);
    res.json({
      compute: user.compute,
      xp: user.xp,
      gpuLevel: user.gpuLevel,
      cooldown: cooldown
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching game status', error });
  }
};