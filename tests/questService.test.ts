
import { createQuest, assignQuestToUser, completeQuest } from '../services/questService';
import Quest from '../models/Quest';
import UserQuest from '../models/UserQuest';
import User from '../models/User';
import { sendPushNotification } from '../services/notificationService';

jest.mock('../models/Quest');
jest.mock('../models/UserQuest');
jest.mock('../models/User');
jest.mock('../services/notificationService');

describe('Quest Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createQuest should create a new quest', async () => {
    const questData = {
      title: 'Test Quest',
      description: 'This is a test quest',
      type: 'DAILY',
      xpReward: 100,
      requirements: { action: 'TAP', count: 10 }
    };
    const mockQuest = { ...questData, save: jest.fn() };
    (Quest as jest.Mock).mockReturnValue(mockQuest);

    await createQuest(questData);

    expect(Quest).toHaveBeenCalledWith(questData);
    expect(mockQuest.save).toHaveBeenCalled();
  });

  test('assignQuestToUser should assign a quest to a user', async () => {
    const mockUserQuest = { save: jest.fn() };
    (UserQuest as jest.Mock).mockReturnValue(mockUserQuest);

    await assignQuestToUser('user123', 'quest456');

    expect(UserQuest).toHaveBeenCalledWith({
      user: 'user123',
      quest: 'quest456',
      status: 'ACTIVE'
    });
    expect(mockUserQuest.save).toHaveBeenCalled();
  });

  // Add more tests for other quest service functions
});
