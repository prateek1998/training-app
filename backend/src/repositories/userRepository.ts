import { Service } from 'typedi';
import BaseRepo from './baseRepository';
import UserModel from '../models/UserModel';
import { IUser, MatchObject, SortObject } from '../types';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class UserRepo extends BaseRepo {
  private defaultSortingOrder = ['fullName', 'ASC'];

  addNewUser(data: IUser) {
    return UserModel.create(data);
  }

  getUserById(userId: Types.ObjectId) {
    return UserModel.findOne({ _id: userId });
  }

  async getAllUsers(query: any) {
    let matchQuery: MatchObject<RegExp> = {};
    const limit: number = parseInt(query.limit) || Constants.limitLength;
    const skip: number = parseInt(query.skip) || Constants.skipLength;

    let regx: RegExp = new RegExp(query.search, 'i');
    matchQuery['fullName'] = {
      $regex: regx,
    };
    let sort: SortObject = this.getSort(query, this.defaultSortingOrder);
    this.setStatus(matchQuery, query.type);
    this.setDept(matchQuery, query.deptId);
    this.setRole(matchQuery, query.role);
    // console.log(matchQuery)
    let result = await UserModel.aggregate([
      {
        $match: matchQuery,
      },
      {
        $sort: sort,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: '$_id',
          fullName: '$fullName',
          email: '$email',
          role: '$role',
          deptId: '$deptId',
          isActive: '$isActive',
        },
      },
    ]);

    return result;
    // return UserModel.find(matchQuery).sort(sort).skip(skip).limit(limit);
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

  deleteUser(userId: string) {
    let data = {
      isActive: false,
    };
    return UserModel.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true });
  }
}
