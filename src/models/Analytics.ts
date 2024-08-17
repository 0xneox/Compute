
import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  userId: string;
  action: string;
  metadata: any;
  timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);