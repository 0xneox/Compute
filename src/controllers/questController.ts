
import { Request, Response } from 'express';
import * as questService from '../services/questService';
import { asyncHandler } from '../utils/asyncHandler';

export const getQuests = asyncHandler(async (req: Request, res: Response) => {
  const quests = await questService.getQuestsForUser(req.user!.id);
  res.json(quests);
});

export const completeQuest = asyncHandler(async (req: Request, res: Response) => {
  const { questId } = req.body;
  const completedQuest = await questService.completeQuest(req.user!.id, questId);
  res.json(completedQuest);
});