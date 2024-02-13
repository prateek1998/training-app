import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  deptId: Types.ObjectId;
  resetToken: string;
  expireToken: string;
  lastLoginTime: Date;
  created_by: Types.ObjectId;
}

export interface IDeptartment extends Document {
  deptName: string;
  deptHead: Types.ObjectId;
  isActive: boolean;
}

export interface ILocation extends Document {
  title: string;
}

export interface IParticipant {
  userId: Types.ObjectId;
  status: string;
  date: Date;
}

export interface IEvents extends Document {
  title: string;
  description: string;
  location: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  depts: Array<Types.ObjectId>;
  trainer: Types.ObjectId;
  participants: Types.Array<IParticipant>;
}

/* 
Service Layer response object interface
this object will be used  by the  service layer 
to return a response to controller layer 
 */
export interface IRepoResponse<T> {
  response: T;
}

export interface SortObject {
  [key: string]: 1 | -1;
}

export interface MatchObject<T> {
  [key: string]: T | { $regex?: T };
}
