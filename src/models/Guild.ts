
import mongoose, { Document, Schema } from 'mongoose';

interface IGuild extends Document {
  name: string;
  founder: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  totalCompute: number;
  level: number;
}

const GuildSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  founder: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalCompute: { type: Number, default: 0 },
  level: { type: Number, default: 1 }
});

export default mongoose.model<IGuild>('Guild', GuildSchema);