
import AIModel from '../models/AIModel';
import User from '../models/User';

export const createAIModel = async (name: string, description: string, computeCost: number, creatorId: string) => {
  const model = new AIModel({
    name,
    description,
    computeCost,
    creator: creatorId
  });

  await model.save();
  return model;
};

export const runAIModel = async (userId: string, modelId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const model = await AIModel.findById(modelId);
  if (!model) {
    throw new Error('AI Model not found');
  }

  if (user.compute < model.computeCost) {
    throw new Error('Insufficient compute');
  }

  user.compute -= model.computeCost;
  await user.save();

  // Simulate running the AI model
  const result = `Result of running ${model.name}: [Simulated output]`;

  await trackUserAction(user.telegramId, 'run_ai_model', { modelId, computeCost: model.computeCost });

  return result;
};