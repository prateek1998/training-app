import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IDeptartment, IEvents, IParticipant, IUser } from '../types';
import Status from '../utils/status-codes-messages.utils';
import BaseValidator from './baseValidator';
import Logger from '../utils/winston.utils';
import { Service } from 'typedi';
import Constants from '../utils/constants.utils';
import { Types } from 'mongoose';

@Service()
export default class EventValidator extends BaseValidator {
  private passMinLength = 6;
  private passNameMaxLength = 100;
  constructor() {
    super();
  }

  validateCreateBody: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let body: IEvents = req.body;
    let title: string = body.title;
    let description: string = body.description;
    let location: Types.ObjectId = body.location;
    let startDate: Date = body.startDate;
    let endDate: Date = body.endDate;
    let depts: Types.Array<IDeptartment> = body.depts;
    let trainer: Types.ObjectId = body.trainer;
    let participants: Types.Array<IParticipant> = body.participants;

    if (Object.keys(body).length == Constants.zeroLength) {
      Logger.error(
        'addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.no_information_provided
      );
      this.sendError(res, Status.ERROR_CODES.events.information_not_provided_msg);
      return;
    }
    if (!title) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.title_not_found);
      this.sendError(res, Status.ERROR_CODES.events.title_not_found_msg);
      return;
    }
    if (typeof title != 'string') {
      Logger.error('`addNewEvent`: validateCreateBody: ' + Status.SERVER_ERRORS.events.title_type);
      this.sendError(res, Status.ERROR_CODES.users.name_type_msg);
      return;
    }
    if (!email) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.email_not_found);
      this.sendError(res, Status.ERROR_CODES.users.email_not_found_msg);
      return;
    }
    if (typeof email != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.email_type);
      this.sendError(res, Status.ERROR_CODES.users.email_type_msg);
      return;
    }
    if (!password) {
      Logger.error(
        'addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.password_not_found
      );
      this.sendError(res, Status.ERROR_CODES.users.password_not_found_msg);
      return;
    }
    let nameLen = password.length;
    if (nameLen < this.passMinLength || nameLen > this.passNameMaxLength) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.password_length);
      this.sendError(res, Status.ERROR_CODES.users.password_length_msg);
      return;
    }
    if (!deptId) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.dept_not_found);
      this.sendError(res, Status.ERROR_CODES.users.dept_not_found_msg);
      return;
    }

    if (typeof deptId != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.users.dept_type);
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
