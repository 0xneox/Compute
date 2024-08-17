
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as questController from '../controllers/questController';

const router = express.Router();

router.get('/', authMiddleware, questController.getQuests);
router.post('/complete', authMiddleware, questController.completeQuest);

export default router;