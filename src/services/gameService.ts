
import User from '../models/User';
import { redisClient } from '../app';
import { trackUserAction } from './analyticsService';
import { sendPushNotification } from './notificationService';

const BASE_COMPUTE_PER_TAP = 1;
const OVERCLOCK_MULTIPLIER = 1.5;
const OVERCLOCK_COOLDOWN_MULTIPLIER = 2;
const MAX_GPU_LEVEL = 7;

export const processTap = async (telegramId: string, isOverclocked: boolean = false) => {
  const user = await User.findOne({ telegramId });
  if (!user) {
    throw new Error('User not found');
  }

  const computePerTap = BASE_COMPUTE_PER_TAP * (user.gpuLevel + 1) * (isOverclocked ? OVERCLOCK_MULTIPLIER : 1);
  user.compute += computePerTap;
  user.xp += 1;

  // Check for GPU level up
  if (user.compute >= (user.gpuLevel + 1) * 1000 && user.gpuLevel < MAX_GPU_LEVEL) {
    user.gpuLevel += 1;
    await sendPushNotification(telegramId, `Congratulations! Your GPU has been upgraded to level ${user.gpuLevel}`);
  }

  // Apply cooldown
  const cooldownTime = isOverclocked ? 5 * 60 * OVERCLOCK_COOLDOWN_MULTIPLIER : 5 * 60; // in seconds
  await redisClient.set(`cooldown:${telegramId}`, 'true', 'EX', cooldownTime);

  await user.save();
  await trackUserAction(telegramId, 'tap', { isOverclocked, computeEarned: computePerTap });

  return user;
};

export const checkCooldown = async (telegramId: string) => {
  const cooldown = await redisClient.get(`cooldown:${telegramId}`);
  return cooldown === 'true';
};

// Add other game-related service functions here