
import { Request, Response } from 'express';
import * as guildService from '../services/guildService';
import { asyncHandler } from '../utils/asyncHandler';

export const getGuilds = asyncHandler(async (req: Request, res: Response) => {
  const guilds = await guildService.getGuilds();
  res.json(guilds);
});

export const createGuild = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const guild = await guildService.createGuild(name, req.user!.id);
  res.json(guild);
});

export const joinGuild = asyncHandler(async (req: Request, res: Response) => {
  const { guildId } = req.body;
  const result = await guildService.joinGuild(req.user!.id, guildId);
  res.json(result);
});

export const getGuildDetails = asyncHandler(async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const guild = await guildService.getGuildDetails(guildId);
  res.json(guild);
});
