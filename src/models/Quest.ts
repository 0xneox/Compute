
import mongoose, { Document, Schema } from 'mongoose';

interface IQuest extends Document {
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'SPECIAL';
  xpReward: number;
  requirements: {
    action: string;
    count: number;
  };
}

const QuestSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['DAILY', 'WEEKLY', 'SPECIAL'], required: true },
  xpReward: { type: Number, required: true },
  requirements: {
    action: { type: String, required: true },
    count: { type: Number, required: true }
  }
});

export default mongoose.model<IQuest>('Quest', QuestSchema);