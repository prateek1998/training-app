import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IDeptartment, ILocation } from '../types';
import Status from '../utils/status-codes-messages.utils';
import BaseValidator from './baseValidator';
import Logger from '../utils/winston.utils';
import { Service } from 'typedi';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class LocationValidator extends BaseValidator {
  private locNameMinLength = 3;
  private locNameMaxLength = 100;
  constructor() {
    super();
  }

  validateCreateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let body: ILocation = req.body;
    let locName: string = body.locName;
    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error('addNewLocation: validateCreateBody: ' + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.loc.information_not_provided_msg);
      return;
    }
    if (!locName) {
      Logger.error('addNewLocation: validateCreateBody: ' + Status.SERVER_ERRORS.loc.name_not_found);
      this.sendError(res, Status.ERROR_CODES.loc.name_not_found_msg);
      return;
    }

    if (typeof locName != 'string') {
      Logger.error('addNewLocation: validateCreateBody: ' + Status.SERVER_ERRORS.loc.name_type);
      this.sendError(res, Status.ERROR_CODES.loc.name_type_msg);
      return;
    }
    let nameLen = locName.length;
    if (nameLen < this.locNameMinLength || nameLen > this.locNameMaxLength) {
      Logger.error("addNewLocation: validateCreateBody: " + Status.SERVER_ERRORS.loc.name_length);
      this.sendError(res, Status.ERROR_CODES.loc.name_length_msg);
      return;
    }
    next();
  };
  validateUpdateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let body: ILocation = req.body;
    let locName: string = body.locName;
    // let deptHead: Types.ObjectId = body.deptHead;

    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.depts.information_not_provided_msg);
      return;
    }
    if (!locName) {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
      return;
    }

    if (typeof locName != 'string') {
      Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_type);
      this.sendError(res, Status.ERROR_CODES.depts.name_type_msg);
      return;
    }
    next();
  };
}
