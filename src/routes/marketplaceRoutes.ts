
import express from 'express';
import { authMiddleware } from '../middleware/auth';
import * as marketplaceController from '../controllers/marketplaceController';

const router = express.Router();

router.get('/listings', authMiddleware, marketplaceController.getListings);
router.post('/create-listing', authMiddleware, marketplaceController.createListing);
router.post('/buy', authMiddleware, marketplaceController.buyListing);

export default router;