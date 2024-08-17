
import Quest from '../models/Quest';
import UserQuest from '../models/UserQuest';
import User from '../models/User';
import { sendPushNotification } from './notificationService';

export const createQuest = async (questData: any) => {
  const quest = new Quest(questData);
  await quest.save();
  return quest;
};

export const assignQuestToUser = async (userId: string, questId: string) => {
  const userQuest = new UserQuest({
    user: userId,
    quest: questId,
    status: 'ACTIVE'
  });
  await userQuest.save();
  return userQuest;
};

export const completeQuest = async (userId: string, questId: string) => {
  const userQuest = await UserQuest.findOne({ user: userId, quest: questId, status: 'ACTIVE' });
  if (!userQuest) {
    throw new Error('Quest not found or already completed');
  }

  const quest = await Quest.findById(questId);
  if (!quest) {
    throw new Error('Quest not found');
  }

  userQuest.status = 'COMPLETED';
  await userQuest.save();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.xp += quest.xpReward;
  await user.save();

  await sendPushNotification(user.telegramId, `Congratulations! You've completed the quest "${quest.title}" and earned ${quest.xpReward} XP!`);

  return userQuest;
};