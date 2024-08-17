
import cron from 'node-cron';
import User from '../models/User';
import { updateLeaderboard } from '../services/leaderboardService';
import { generateDailyQuests } from '../services/questService';
import { checkAndUpdateStreaks } from '../services/userService';

export const setupCronJobs = () => {
  // Reset daily XP claim and update streaks
  cron.schedule('0 0 * * *', async () => {
    await User.updateMany({}, { $set: { lastDailyClaimTime: null } });
    await checkAndUpdateStreaks();
    console.log('Daily XP claim reset and streaks updated');
  });

  // Update leaderboard
  cron.schedule('0 * * * *', async () => {
    await updateLeaderboard();
    console.log('Leaderboard updated');
  });

  // Generate daily quests
  cron.schedule('0 0 * * *', async () => {
    await generateDailyQuests();
    console.log('Daily quests generated');
  });
};
