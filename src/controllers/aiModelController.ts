
import { Request, Response } from 'express';
import * as aiModelService from '../services/aiModelService';
import { asyncHandler } from '../utils/asyncHandler';

export const getAIModels = asyncHandler(async (req: Request, res: Response) => {
  const models = await aiModelService.getAIModels();
  res.json(models);
});

export const createAIModel = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, computeCost } = req.body;
  const model = await aiModelService.createAIModel(name, description, computeCost, req.user!.id);
  res.json(model);
});

export const runAIModel = asyncHandler(async (req: Request, res: Response) => {
  const { modelId } = req.body;
  const result = await aiModelService.runAIModel(req.user!.id, modelId);
  res.json(result);
});