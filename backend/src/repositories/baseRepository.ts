import moment from 'moment';
import Constants from '../utils/constants.utils';
import { SortObject } from '../types';
import mongoose, { Types } from 'mongoose';

export default class BaseRepo {
  constructor() { }

  protected setStatus(matchQuery: any, type: string) {
    switch (type) {
      case 'inactive':
        matchQuery.isActive = false;
        break;
      case 'all':
        break;
      case 'active':
      default:
        matchQuery.isActive = true;
    }
  }

  protected setRole(matchQuery: any, role: string) {
    if (role) {
      matchQuery.role = role;
    }
  }

  protected setDept(matchQuery: any, deptId: any) {
    if (deptId) {
      matchQuery.deptId = new Types.ObjectId(deptId);
    }
  }

  protected setQueryDate(matchQuery: any, startDate: any, endDate: any) {
    if (startDate && endDate) {
      matchQuery["created_at"] = {
        "$gte": startDate,
        "$lte": endDate
      }
    }
  }

  protected getSort(query: any, defaultSorting: Array<string>) {
    let tmpOrder: SortObject = {};
    switch (query.sortOrder) {
      case 'DESC':
        tmpOrder[query.sortBy] = -1;
        break;
      case 'ASC':
        tmpOrder[query.sortBy] = 1;
        break;
      default:
        tmpOrder[defaultSorting[Constants.zeroLength]] = defaultSorting[Constants.oneLength] == 'ASC' ? 1 : -1;
        break;
    }
    return tmpOrder;
  }
}
