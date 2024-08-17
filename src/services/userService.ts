
import User from '../models/User';
import { sendPushNotification } from './notificationService';

export const checkAndUpdateStreaks = async () => {
  const users = await User.find();
  const now = new Date();

  for (const user of users) {
    const lastUpdate = new Date(user.lastStreakUpdateTime);
    const daysSinceLastUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLastUpdate === 1) {
      user.dailyStreak += 1;
      if (user.dailyStreak % 7 === 0) {
        // Bonus for week-long streak
        user.xp += 1000;
        await sendPushNotification(user.telegramId, `Congratulations! You've maintained a ${user.dailyStreak}-day streak and earned 1000 bonus XP!`);
      }
    } else if (daysSinceLastUpdate > 1) {
      user.dailyStreak = 0;
    }

    user.lastStreakUpdateTime = now;
    await user.save();
  }
};

export const processReferral = async (referrerCode: string, newUserId: string) => {
  const referrer = await User.findOne({ referralCode: referrerCode });
  const newUser = await User.findById(newUserId);

  if (!referrer || !newUser) {
    throw new Error('Invalid referral');
  }

  referrer.xp += 1000; // Bonus XP for successful referral
  newUser.referredBy = referrer.telegramId;
  newUser.xp += 500; // Bonus XP for using a referral code

  await referrer.save();
  await newUser.save();

  await sendPushNotification(referrer.telegramId, `You've earned 1000 XP for referring a new user!`);
  await sendPushNotification(newUser.telegramId, `Welcome! You've earned 500 XP for using a referral code!`);
};