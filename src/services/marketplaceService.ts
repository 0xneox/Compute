
import Listing from '../models/Listing';
import User from '../models/User';
import { trackUserAction } from './analyticsService';

export const createListing = async (userId: string, compute: number, price: number) => {
  const user = await User.findById(userId);
  if (!user || user.compute < compute) {
    throw new Error('Insufficient compute');
  }

  const listing = new Listing({
    seller: userId,
    compute,
    price
  });

  user.compute -= compute;
  await user.save();
  await listing.save();

  await trackUserAction(user.telegramId, 'create_listing', { compute, price });

  return listing;
};

export const buyListing = async (userId: string, listingId: string) => {
  const listing = await Listing.findById(listingId);
  if (!listing || listing.status !== 'ACTIVE') {
    throw new Error('Listing not found or not available');
  }

  const buyer = await User.findById(userId);
  if (!buyer || buyer.compute < listing.price) {
    throw new Error('Insufficient funds');
  }

  const seller = await User.findById(listing.seller);
  if (!seller) {
    throw new Error('Seller not found');
  }

  buyer.compute -= listing.price;
  buyer.compute += listing.compute;
  seller.compute += listing.price;

  listing.status = 'SOLD';
  listing.buyer = userId;

  await buyer.save();
  await seller.save();
  await listing.save();

  await trackUserAction(buyer.telegramId, 'buy_listing', { listingId, compute: listing.compute, price: listing.price });

  return listing;
};