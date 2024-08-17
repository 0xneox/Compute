
import mongoose, { Document, Schema } from 'mongoose';

interface IUserQuest extends Document {
  user: Schema.Types.ObjectId;
  quest: Schema.Types.ObjectId;
  status: 'ACTIVE' | 'COMPLETED';
  progress: number;
}

const UserQuestSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quest: { type: Schema.Types.ObjectId, ref: 'Quest', required: true },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED'], default: 'ACTIVE' },
 progress: { type: Number, default: 0 }
});

export default mongoose.model<IUserQuest>('UserQuest', UserQuestSchema);
