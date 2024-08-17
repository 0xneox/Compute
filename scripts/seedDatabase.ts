
import mongoose from 'mongoose';
import User from '../src/models/User';
import Quest from '../src/models/Quest';
import AIModel from '../src/models/AIModel';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Seed users
    await User.create([
      { telegramId: '123456', username: 'user1', xp: 1000, compute: 500, gpuLevel: 2 },
      { telegramId: '789012', username: 'user2', xp: 1500, compute: 750, gpuLevel: 3 },
    ]);

    // Seed quests
    await Quest.create([
      {
        title: 'Daily Tapper',
        description: 'Tap 100 times in a day',
        type: 'DAILY',
        xpReward: 200,
        requirements: { action: 'TAP', count: 100 },
      },
      {
        title: 'Social Butterfly',
        description: 'Refer 5 friends',
        type: 'WEEKLY',
        xpReward: 1000,
        requirements: { action: 'REFER', count: 5 },
      },
    ]);

    // Seed AI models
    await AIModel.create([
      {
        name: 'Image Classifier',
        description: 'Classify images into categories',
        creator: '123456',
        computeCost: 100,
      },
      {
        name: 'Text Summarizer',
        description: 'Generate concise summaries of long texts',
        creator: '789012',
        computeCost: 150,
      },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();