import { model, Schema } from 'mongoose';
import { IUser } from '../types';

const UserSchema: Schema = new Schema({
  fullName: {
    type: String,
    lowercase: true,
    minlenght: 3,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'maintainer'],
    default: 'user',
    required: 'Please provide at least one role',
  },
  expireToken: {
    type: Date,
  },
  lastLoginTime: {
    //web
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IUser>('users', UserSchema);
