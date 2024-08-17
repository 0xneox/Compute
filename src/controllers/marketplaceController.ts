
import { Request, Response } from 'express';
import * as marketplaceService from '../services/marketplaceService';
import { asyncHandler } from '../utils/asyncHandler';

export const getListings = asyncHandler(async (req: Request, res: Response) => {
  const listings = await marketplaceService.getListings();
  res.json(listings);
});

export const createListing = asyncHandler(async (req: Request, res: Response) => {
  const { compute, price } = req.body;
  const listing = await marketplaceService.createListing(req.user!.id, compute, price);
  res.json(listing);
});

export const buyListing = asyncHandler(async (req: Request, res: Response) => {
  const { listingId } = req.body;
  const transaction = await marketplaceService.buyListing(req.user!.id, listingId);
  res.json(transaction);
});