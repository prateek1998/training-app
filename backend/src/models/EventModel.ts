import { model, Schema } from 'mongoose';
import { IEvents } from '../types';

const EventSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  depts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
  ],
  participants: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
      },
      markAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

EventSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IEvents>('Event', EventSchema);
