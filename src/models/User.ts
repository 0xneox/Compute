

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  telegramId: string;
  username: string;
  xp: number;
  compute: number;
  gpuLevel: number;
  lastDailyClaimTime: Date;
  referralCode: string;
  referredBy: string;
  guild: Schema.Types.ObjectId;
  dailyStreak: number;
  lastStreakUpdateTime: Date;
}

const UserSchema: Schema = new Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  xp: { type: Number, default: 0 },
  compute: { type: Number, default: 0 },
  gpuLevel: { type: Number, default: 0 },
  lastDailyClaimTime: { type: Date, default: null },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  guild: { type: Schema.Types.ObjectId, ref: 'Guild', default: null },
  dailyStreak: { type: Number, default: 0 },
  lastStreakUpdateTime: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;