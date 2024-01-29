import { Service } from 'typedi';
import BaseRepo from './baseRepository';
import UserModel from '../models/UserModel';
import { IUser, MatchObject, SortObject } from '../types';
import Constants from '../utils/constants.utils';

@Service()
export default class UserRepo extends BaseRepo {
  private defaultSortingOrder = ['fullName', 'ASC'];

  addNewUser(data: IUser) {
    return UserModel.create(data);
  }
  getAllUsers(query: any) {
    let matchQuery: MatchObject<RegExp> = {};
    const limit: number = parseInt(query.limit) || Constants.limitLength;
    const skip: number = parseInt(query.skip) || Constants.skipLength;

    let regx: RegExp = new RegExp(query.search, 'i');
    matchQuery['deptName'] = {
      $regex: regx,
    };
    let sort: SortObject = this.getSort(query, this.defaultSortingOrder);
    this.setStatus(matchQuery, query.type);
    return UserModel.find(matchQuery).sort(sort).skip(skip).limit(limit);
  }

  getUserByName(name: string) {
    name = name.toLowerCase();
    return UserModel.findOne({ fullName: name });
  }

  getUserByEmail(email: string) {
    email = email.toLowerCase();
    return UserModel.findOne({ email });
  }

  updateUser(userId: string, data: IUser) {
    return UserModel.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true });
  }

  // getDeptByName(title: string) {
  //   return UserModel.findOne({ deptName: title });
  // }
  // updateDept(deptId: string, data: IUser) {
  //   return UserModel.findOneAndUpdate({ _id: deptId }, { $set: data }, { new: true });
  // }
  // deleteDept(deptId: string) {
  //   let data = {
  //     isActive: false,
  //   };
  //   return UserModel.findOneAndUpdate({ _id: deptId }, { $set: data }, { new: true });
  // }
}
