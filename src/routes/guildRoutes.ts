
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as guildController from '../controllers/guildController';

const router = express.Router();

router.get('/', authMiddleware, guildController.getGuilds);
router.post('/create', authMiddleware, guildController.createGuild);
router.post('/join', authMiddleware, guildController.joinGuild);
router.get('/:guildId', authMiddleware, guildController.getGuildDetails);

export default router;