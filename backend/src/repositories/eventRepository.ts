import { Service } from 'typedi';
import BaseRepo from './baseRepository';
import EventModel from '../models/EventModel';
import { IEvents, MatchObject, SortObject } from '../types';
import Constants from '../utils/constants.utils';

@Service()
export default class EventRepo extends BaseRepo {
  private defaultSortingOrder = ['created_at', 'DESC'];

  addNewEvent(data: IEvents) {
    return EventModel.create(data);
  }

  async getAllEvents(query: any) {
    let matchQuery: MatchObject<RegExp> = {};
    const limit: number = parseInt(query.limit) || Constants.limitLength;
    const skip: number = parseInt(query.skip) || Constants.skipLength;

    let regx: RegExp = new RegExp(query.search, 'i');
    matchQuery['title'] = {
      $regex: regx,
    };
    let sort: SortObject = this.getSort(query, this.defaultSortingOrder);
    this.setQueryDate(matchQuery, query.startDate, query.endDate);
    this.setStatus(matchQuery, query.type);
    this.setDept(matchQuery, query.deptId);
    console.log(matchQuery)
    let result = await EventModel.aggregate([
      {
        $lookup: {
            "from": "users",
            "localField": "trainer",
            "foreignField": "_id",
            "as": "trainer"
        },
      },{
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
   
      // {
      //   $project: {
      //     _id: '$_id',
      //     title: '$title',
      //     description: '$description',
      //     // trainer: '$trainer',
      //     startDate: '$startDate',
      //     endDate: '$endDate',
      //     isActive: '$isActive',
      //   },
      // },
    ]);

    return result;
    // return EventModel.find(matchQuery).sort(sort).skip(skip).limit(limit);
  }

  // getUserByName(name: string) {
  //   name = name.toLowerCase();
  //   return UserModel.findOne({ fullName: name });
  // }

  // getUserByEmail(email: string) {
  //   email = email.toLowerCase();
  //   return UserModel.findOne({ email });
  // }

  // updateUser(userId: string, data: IUser) {
  //   return UserModel.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true });
  // }

  // deleteUser(userId: string) {
  //   let data = {
  //     isActive: false,
  //   };
  //   return UserModel.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true });
  // }
}
