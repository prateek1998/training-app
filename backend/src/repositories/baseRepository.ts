import moment from 'moment';
import Constants from '../utils/constants.utils';
import { SortObject } from '../types';

export default class BaseRepo {
  constructor() {}

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

  protected setQueryDate(matchQuery: any, startDate: any, endDate: any) {
    if (startDate && endDate) {
      let startedDate: Date = new Date(moment(startDate).format('YYYY-MM-DDT00:00:00.000') + 'Z');
      let endedDate: Date = new Date(moment(endDate).format('YYYY-MM-DDT23:59:59.999') + 'Z');
      matchQuery.createdAt = {
        // [Sequelize.Op.between]: [startedDate, endedDate],
      };
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
        tmpOrder[defaultSorting[Constants.zeroLength]] =
          defaultSorting[Constants.oneLength] == 'ASC' ? 1 : -1;
        break;
    }
    return tmpOrder;
  }
}
