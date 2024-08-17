
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as aiModelController from '../controllers/aiModelController';

const router = express.Router();

router.get('/', authMiddleware, aiModelController.getAIModels);
router.post('/create', authMiddleware, aiModelController.createAIModel);
router.post('/run', authMiddleware, aiModelController.runAIModel);

export default router;