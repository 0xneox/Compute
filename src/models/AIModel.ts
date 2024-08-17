
import mongoose, { Document, Schema } from 'mongoose';

interface IAIModel extends Document {
  name: string;
  description: string;
  creator: Schema.Types.ObjectId;
  computeCost: number;
  timesRun: number;
}

const AIModelSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  computeCost: { type: Number, required: true },
  timesRun: { type: Number, default: 0 }
});

export default mongoose.model<IAIModel>('AIModel', AIModelSchema);