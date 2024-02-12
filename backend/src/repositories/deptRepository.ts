import { Service } from 'typedi';
import BaseRepo from './baseRepository';
import DeptModel from '../models/DepartmentModel';
import { IDeptartment, MatchObject, SortObject } from '../types';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class DeptRepo extends BaseRepo {
  private defaultSortingOrder = ['deptName', 'ASC'];

  addNewDept(data: IDeptartment) {
    return DeptModel.create(data);
  }

  getDeptById(deptId: Types.ObjectId) {
    return DeptModel.findOne({ _id: deptId });
  }
  
  getDeptsByIds(deptIds: Array<Types.ObjectId>) {
    console.log(deptIds)
    return DeptModel.find({ _id: deptIds });
  }
  
  getAllDepts(query: any) {
    let matchQuery: MatchObject<RegExp> = {};
    const limit: number = parseInt(query.limit) || Constants.limitLength;
    const skip: number = parseInt(query.skip) || Constants.skipLength;

    let regx: RegExp = new RegExp(query.search, 'i');
    matchQuery['deptName'] = {
      $regex: regx,
    };
    let sort: SortObject = this.getSort(query, this.defaultSortingOrder);
    this.setStatus(matchQuery, query.type);
    return DeptModel.find(matchQuery).sort(sort).skip(skip).limit(limit);
  }


  updateDept(deptId: string, data: IDeptartment) {
    return DeptModel.findOneAndUpdate({ _id: deptId }, { $set: data }, { new: true });
  }

  deleteDept(deptId: string) {
    let data = {
      isActive: false,
    };
    return DeptModel.findOneAndUpdate({ _id: deptId }, { $set: data }, { new: true });
  }
}
