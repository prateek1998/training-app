import { model, Schema } from 'mongoose';
import { ILocation } from '../types';

const LocationSchema: Schema = new Schema({
  title: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  // created_by: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

LocationSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model<ILocation>('Location', LocationSchema);
