import { Router } from 'express';
import userRoutes from './userRoutes';
import gameRoutes from './gameRoutes';
import questRoutes from './questRoutes';
import leaderboardRoutes from './leaderboardRoutes';
import marketplaceRoutes from './marketplaceRoutes';
import guildRoutes from './guildRoutes';
import aiModelRoutes from './aiModelRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/game', gameRoutes);
router.use('/quests', questRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/guilds', guildRoutes);
router.use('/ai-models', aiModelRoutes);

export default router;