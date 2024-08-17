
import { processTap, checkCooldown } from '../services/gameService';
import User from '../models/User';
import { redisClient } from '../app';

jest.mock('../models/User');
jest.mock('../app', () => ({
  redisClient: {
    set: jest.fn(),
    get: jest.fn(),
  },
}));
describe('Game Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('processTap should increase user compute and xp', async () => {
    const mockUser = {
      telegramId: '123456',
      compute: 100,
      xp: 50,
      gpuLevel: 1,
      save: jest.fn(),
    };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    await processTap('123456');

    expect(mockUser.compute).toBe(102); // BASE_COMPUTE_PER_TAP * (gpuLevel + 1) = 1 * 2 = 2
    expect(mockUser.xp).toBe(51);
    expect(mockUser.save).toHaveBeenCalled();
    expect(redisClient.set).toHaveBeenCalledWith('cooldown:123456', 'true', 'EX', 300);
  });

  test('checkCooldown should return true if user is in cooldown', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue('true');

    const result = await checkCooldown('123456');

    expect(result).toBe(true);
    expect(redisClient.get).toHaveBeenCalledWith('cooldown:123456');
  });

  // Add more tests for other game service functions
});
