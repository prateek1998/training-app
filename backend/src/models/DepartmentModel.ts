import { model, Schema } from 'mongoose';
import { IDeptartment } from '../types';

const DepartmentSchema: Schema = new Schema({
  deptName: {
    type: String,
    unique: true,
    required: true,
  },
  deptHead: {
    type: String,
  },
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

DepartmentSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IDeptartment>('departments', DepartmentSchema);
