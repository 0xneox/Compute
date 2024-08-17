import User from '../models/User';
import { redisClient } from '../app';

const LEADERBOARD_SIZE = 100;
const LEADERBOARD_CACHE_TIME = 60 * 60; // 1 hour in seconds

export const updateLeaderboard = async () => {
  const users = await User.find().sort('-xp -compute -gpuLevel').limit(LEADERBOARD_SIZE);
  
  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    xp: user.xp,
    compute: user.compute,
    gpuLevel: user.gpuLevel
  }));

  await redisClient.set('leaderboard', JSON.stringify(leaderboard), 'EX', LEADERBOARD_CACHE_TIME);
};

export const getLeaderboard = async () => {
  const cachedLeaderboard = await redisClient.get('leaderboard');
  if (cachedLeaderboard) {
    return JSON.parse(cachedLeaderboard);
  }

  await updateLeaderboard();
  return JSON.parse(await redisClient.get('leaderboard') || '[]');
};

export const getUserRank = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const rank = await User.countDocuments({
    $or: [
      { xp: { $gt: user.xp } },
      { xp: user.xp, compute: { $gt: user.compute } },
      { xp: user.xp, compute: user.compute, gpuLevel: { $gt: user.gpuLevel } }
    ]
  });

  return rank + 1; // Adding 1 because rank is zero-indexed
};