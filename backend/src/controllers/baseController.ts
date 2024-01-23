import moment from 'moment';
import BaseResponse from '../utils/base-response.utils';
import StatusMessage from '../utils/status-codes-messages.utils';

export default class BaseController extends BaseResponse {
  protected checkQueryValidate(query: any) {
    let error: any = '';
    let startDateExist = query.hasOwnProperty('startDate');
    let endDateExist = query.hasOwnProperty('endDate');
    let sortExist = query.hasOwnProperty('sortBy');
    let sortOrderExist = query.hasOwnProperty('sortOrder');

    if (startDateExist !== endDateExist) {
      error = StatusMessage.SERVER_ERRORS.queryDate;
      return error;
    }
    if (startDateExist && endDateExist) {
      let startDateValid = this.checkDateFormat(query.startDate);
      let endDateValid = this.checkDateFormat(query.endDate);
      if (!startDateValid || !endDateValid) {
        error = StatusMessage.SERVER_ERRORS.queryDateFormat;
        return error;
      }

      if (!moment(query.startDate).isSameOrBefore(query.endDate)) return StatusMessage.SERVER_ERRORS.queryStartDateBetweenEndDate;
    }

    if (sortExist !== sortOrderExist) {
      error = StatusMessage.SERVER_ERRORS.querySort;
      return error;
    }
  }

  private checkDateFormat(date: string) {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }

  protected getDbError(reason: any) {
    console.log('getDbError reason.name ---> ', reason.name);
    let errCode: number;
    switch (reason.name) {
      case StatusMessage.DB_ERRORS.accessDeniedError:
        errCode = 1002;
        break;
      case StatusMessage.DB_ERRORS.uniqueConstantError:
        errCode = 1003;
        break;
      case StatusMessage.DB_ERRORS.validationError:
        errCode = 1004;
        break;
      case StatusMessage.DB_ERRORS.MongoDBConnectionError:
        errCode = 1005;
        break;
      case StatusMessage.DB_ERRORS.MongoDBDuplicateError:
        errCode = 1006;
        break;
      case StatusMessage.DB_ERRORS.MongoDBCastError:
        errCode = 1011;
        break;
      default:
        errCode = 1001;
        break;
    }
    return {
      error: true,
      errCode,
    };
  }

  protected getQueryError(reason: any) {
    console.log('getQueryError reason.name ---> ', reason);
    let errCode: number;
    switch (reason) {
      case StatusMessage.SERVER_ERRORS.queryDate:
        errCode = 1007;
        break;
      case StatusMessage.SERVER_ERRORS.querySort:
        errCode = 1008;
        break;
      case StatusMessage.SERVER_ERRORS.queryDateFormat:
        errCode = 1009;
        break;
      case StatusMessage.SERVER_ERRORS.queryStartDateBetweenEndDate:
        errCode = 1010;
        break;
      default:
        errCode = 1001;
        break;
    }
    return {
      error: true,
      errCode,
    };
  }

  protected getModifiedError(err: any, errMsg: Array<any>) {
    errMsg[0] = err.errCode;
    return errMsg;
  }
  protected removeKeyfromObject(data: any, key: string) {
    data = data.toJSON();
    delete data[key];
    return data;
  }

  protected removeKeysfromObject(data: any, keyArr: Array<string>) {
    data = data.toJSON();
    keyArr.forEach((key) => {
      delete data[key];
    });
    return data;
  }
}
