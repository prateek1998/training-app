import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IDeptartment } from '../types';
import Status from '../utils/status-codes-messages.utils';
import BaseValidator from './baseValidator';
import Logger from '../utils/winston.utils';
import { Service } from 'typedi';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class DeptValidator extends BaseValidator {
  // private classifyNameMinLength = 3;
  // private classifyNameMaxLength = 200;
  // private ratingMinLimit = 1;
  // private ratingMaxLimit = 5;
  constructor() {
    super();
  }

  validateCreateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let body: IDeptartment = req.body;
    let deptName: string = body.deptName;
    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error('addNewDept: validateCreateBody: ' + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.depts.information_not_provided_msg);
      return;
    }
    if (!deptName) {
      Logger.error('addNewDept: validateCreateBody: ' + Status.SERVER_ERRORS.depts.name_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
      return;
    }

    if (typeof deptName != 'string') {
      Logger.error('addNewDept: validateCreateBody: ' + Status.SERVER_ERRORS.depts.name_type);
      this.sendError(res, Status.ERROR_CODES.depts.name_type_msg);
      return;
    }
    next();
  };
  validateUpdateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let body: IDeptartment = req.body;
    let deptName: string = body.deptName;
    let deptHead: Types.ObjectId = body.deptHead;

    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.depts.information_not_provided_msg);
      return;
    }
    if (!deptName) {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
      return;
    }

    if (typeof deptName != 'string') {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_type);
      this.sendError(res, Status.ERROR_CODES.depts.name_type_msg);
      return;
    }

    if (!deptHead) {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.head_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
      return;
    }

    if (typeof deptHead != 'string') {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.head_type);
      this.sendError(res, Status.ERROR_CODES.depts.head_type_msg);
      return;
    }
    next();
  };
}
