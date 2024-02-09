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
    // let participants: Types.Array<IParticipant> = body.participants;

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
      this.sendError(res, Status.ERROR_CODES.events.title_type_msg);
      return;
    }
    if (!description) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.description_not_found);
      this.sendError(res, Status.ERROR_CODES.events.description_not_found_msg);
      return;
    }
    if (typeof description != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.description_type);
      this.sendError(res, Status.ERROR_CODES.events.description_type_msg);
      return;
    }
    if (!startDate) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.startDate_not_found);
      this.sendError(res, Status.ERROR_CODES.events.startDate_not_found_msg);
      return;
    }
    if (typeof startDate != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.startDate_type);
      this.sendError(res, Status.ERROR_CODES.events.startDate_type_msg);
      return;
    }
    if (!endDate) {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.endDate_type);
      this.sendError(res, Status.ERROR_CODES.events.endDate_type_msg);
      return;
    }
    if (typeof endDate != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.description_type);
      this.sendError(res, Status.ERROR_CODES.events.description_type_msg);
      return;
    }
    if (!location) {
      Logger.error(
        'addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.location_not_found
      );
      this.sendError(res, Status.ERROR_CODES.events.location_not_found_msg);
      return;
    }
    if (typeof location != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.location_type);
      this.sendError(res, Status.ERROR_CODES.events.location_type_msg);
      return;
    }
    if (!trainer) {
      Logger.error(
        'addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.trainer_not_found
      );
      this.sendError(res, Status.ERROR_CODES.events.trainer_not_found_msg);
      return;
    }
    if (typeof trainer != 'string') {
      Logger.error('addNewEvent: validateCreateBody: ' + Status.SERVER_ERRORS.events.trainer_type);
      this.sendError(res, Status.ERROR_CODES.events.trainer_type_msg);
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
