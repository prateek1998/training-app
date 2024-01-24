import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IUser } from '../types';
import Status from '../utils/status-codes-messages.utils';
import BaseValidator from './baseValidator';
import Logger from '../utils/winston.utils';
import { Service } from 'typedi';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class UserValidator extends BaseValidator {
  private passMinLength = 6;
  private passNameMaxLength = 100;
  constructor() {
    super();
  }

  validateCreateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let body: IUser = req.body;
    let fullName: string = body.fullName;
    let email: string = body.email;
    let password: string = body.password;
    let dept: Types.ObjectId = body.dept;

    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.users.information_not_provided_msg);
      return;
    }
    if (!fullName) {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.name_not_found);
      this.sendError(res, Status.ERROR_CODES.users.name_not_found_msg);
      return;
    }
    if (typeof fullName != 'string') {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.name_type);
      this.sendError(res, Status.ERROR_CODES.users.name_type_msg);
      return;
    }
    if (!email) {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.email_not_found);
      this.sendError(res, Status.ERROR_CODES.users.email_not_found_msg);
      return;
    }
    if (typeof email != 'string') {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.email_type);
      this.sendError(res, Status.ERROR_CODES.users.email_type_msg);
      return;
    }
    if (!password) {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.password_not_found);
      this.sendError(res, Status.ERROR_CODES.users.password_not_found_msg);
      return;
    }
    let nameLen = password.length;
    if (nameLen < this.passMinLength || nameLen > this.passNameMaxLength) {
      Logger.error("addNewUser: validateCreateBody: " + Status.SERVER_ERRORS.users.password_length);
      this.sendError(res, Status.ERROR_CODES.users.password_length_msg);
      return;
    }
    if (!dept) {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.dept_not_found);
      this.sendError(res, Status.ERROR_CODES.users.dept_not_found_msg);
      return;
    }

    if (typeof dept != 'string') {
      Logger.error('addNewUser: validateCreateBody: ' + Status.SERVER_ERRORS.users.dept_type);
      this.sendError(res, Status.ERROR_CODES.users.dept_type_msg);
      return;
    }
    next();
  };
  
  // validateUpdateBody: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  //   let body: IUser = req.body;
  //   let deptName: string = body.deptName;
  //   let deptHead: Types.ObjectId = body.deptHead;

  //   if (Object.keys(body).length == Constants.zeroLength) {
  //     Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.no_information_provided);
  //     this.sendError(res, Status.ERROR_CODES.depts.information_not_provided_msg);
  //     return;
  //   }
  //   if (!deptName) {
  //     Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
  //     return;
  //   }

  //   if (typeof deptName != 'string') {
  //     Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.name_type);
  //     this.sendError(res, Status.ERROR_CODES.depts.name_type_msg);
  //     return;
  //   }

  //   if (!deptHead) {
  //     Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.head_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
  //     return;
  //   }

  //   if (typeof deptHead != 'string') {
  //     Logger.error('updateDept: validateUpdateBody: ' + Status.SERVER_ERRORS.depts.head_type);
  //     this.sendError(res, Status.ERROR_CODES.depts.head_type_msg);
  //     return;
  //   }
  //   next();
  // };
}
