import { Service } from 'typedi';
import BaseRepo from './baseRepository';
import LocationModel from '../models/LocationModel';
import { ILocation, MatchObject, SortObject } from '../types';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class LocationRepo extends BaseRepo {
  private defaultSortingOrder = ['title', 'ASC'];
  addNewLocation(data: ILocation) {
    return LocationModel.create(data);
  }

  getLocationById(locId: Types.ObjectId) {
    return LocationModel.findOne({ _id: locId });
  }

  getAllLocations(query: any) {
    let matchQuery: MatchObject<RegExp> = {};
    const limit: number = parseInt(query.limit) || Constants.limitLength;
    const skip: number = parseInt(query.skip) || Constants.skipLength;

    let regx: RegExp = new RegExp(query.search, 'i');
    matchQuery['title'] = {
      $regex: regx,
    };
    let sort: SortObject = this.getSort(query, this.defaultSortingOrder);
    return LocationModel.find(matchQuery).sort(sort).skip(skip).limit(limit);
  }

  updateLocation(locId: string, data: ILocation) {
    return LocationModel.findOneAndUpdate({ _id: locId }, { $set: data }, { new: true });
  }

  deleteLocation(locId: string) {
    return LocationModel.deleteOne({ _id: locId });
  }
}
