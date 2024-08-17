
import mongoose, { Document, Schema } from 'mongoose';

interface IListing extends Document {
  seller: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
  compute: number;
  price: number;
  status: 'ACTIVE' | 'SOLD' | 'CANCELLED';
  createdAt: Date;
}

const ListingSchema: Schema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  compute: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['ACTIVE', 'SOLD', 'CANCELLED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IListing>('Listing', ListingSchema);