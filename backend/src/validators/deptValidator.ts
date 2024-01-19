import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IDeptartment } from '../types';
import Status from '../utils/status-codes-messages.utils';
import BaseValidator from './baseValidator';
import Logger from '../utils/winston.utils';
import { Service } from 'typedi';
import Constants from '../utils/constants.utils';

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
    // let review: string = body.review;
    // let rating: number = body.rating;
    // let isNegative: boolean = body.isNegative;
    if(Object.keys(body).length == Constants.zeroLength){
      Logger.error("updateClassification: validateUpdateBody: " + Status.SERVER_ERRORS.no_information_provided);
      this.sendError(res, Status.ERROR_CODES.depts.information_not_provided_msg);
      return;
    }     
    if (!deptName) {
      Logger.error('addNewDept: validateCreateBody: ' + Status.SERVER_ERRORS.depts.name_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.name_not_found_msg);
      return;
    }

    if (typeof deptName != 'string') {
      Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.depts.name_type);
      this.sendError(res, Status.ERROR_CODES.depts.name_type_msg);
      return;
    }

    // let nameLen = name.length;
    // if (nameLen < this.classifyNameMinLength || nameLen > this.classifyNameMaxLength) {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.name_length);
    //   this.sendError(res, Status.ERROR_CODES.reviews.name_length_msg);
    //   return;
    // }

    // if (!review) {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.review_not_found);
    //   this.sendError(res, Status.ERROR_CODES.reviews.review_not_found_msg);
    //   return;
    // }

    // if (typeof review != 'string') {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.review_type);
    //   this.sendError(res, Status.ERROR_CODES.reviews.review_type_msg);
    //   return;
    // }

    // if (!rating) {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.rating_not_found);
    //   this.sendError(res, Status.ERROR_CODES.reviews.rating_not_found_msg);
    //   return;
    // }

    // if (typeof rating != 'number') {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.rating_type);
    //   this.sendError(res, Status.ERROR_CODES.reviews.rating_type_msg);
    //   return;
    // }

    // if (rating < this.ratingMinLimit || rating > this.ratingMaxLimit) {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.rating_limit);
    //   this.sendError(res, Status.ERROR_CODES.reviews.rating_limit_msg);
    //   return;
    // }

    // if (isNegative === undefined || isNegative === null) {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.isNegative_not_found);
    //   this.sendError(res, Status.ERROR_CODES.reviews.isNegative_not_found_msg);
    //   return;
    // }

    // if (typeof isNegative != 'boolean') {
    //   Logger.error('addNewReview: validateCreateBody: ' + Status.SERVER_ERRORS.reviews.isNegative_type);
    //   this.sendError(res, Status.ERROR_CODES.reviews.isNegative_type_msg);
    //   return;
    // }
    next();
  }
}
