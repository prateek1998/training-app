import { Response, Request, NextFunction } from 'express';
import BaseController from './baseController';
import EventRepo from '../repositories/eventRepository';
import DeptRepo from '../repositories/deptRepository';
import Logger from '../utils/winston.utils';
import Status from '../utils/status-codes-messages.utils';
import { Service } from 'typedi';
import { IEvents } from '../types';
import Constants from '../utils/constants.utils';
import moment from 'moment';
import LocationRepo from '../repositories/locRepository';
import UserRepo from '../repositories/userRepository';

@Service()
class EventController extends BaseController {
  constructor(
    private eventRepo: EventRepo,
    private locRepo: LocationRepo,
    private userRepo: UserRepo,
    private deptRepo: DeptRepo
  ) {
    super();
  }

  addNewEvent = async (req: Request, res: Response) => {
    let data: IEvents = req.body;
    let locationData: any = await this.locRepo.getLocationById(data.location).catch((reason) => {
      console.error('addNewEvent: failed to get location reason - ', reason);
      Logger.error('addNewEvent: ' + reason);
      return this.getDbError(reason);
    });
    if (!locationData) {
      Logger.error('addNewEvent: ' + Status.SERVER_ERRORS.loc.record_not_found);
      this.sendError(res, Status.ERROR_CODES.loc.record_not_found_msg);
      return;
    }
    if (locationData.error) {
      this.sendError(res,this.getModifiedError(locationData, Status.ERROR_CODES.events.add_db_error_msg))
      return;
    }
    let trainerData: any = await this.userRepo.getUserById(data.trainer).catch((reason) => {
      console.error('addNewEvent: failed to get trainer reason - ', reason);
      Logger.error('addNewEvent: ' + reason);
      return this.getDbError(reason);
    });
    if (!trainerData) {
      Logger.error('addNewEvent: ' + Status.SERVER_ERRORS.users.record_not_found);
      this.sendError(res, Status.ERROR_CODES.users.record_not_found_msg);
      return;
    }
    if (trainerData.error) {
      this.sendError(res,this.getModifiedError(locationData, Status.ERROR_CODES.events.add_db_error_msg))
      return;
    }
    let deptsData: any = await this.deptRepo.getDeptsByIds(data.depts).catch((reason) => {
      console.error('addNewEvent: failed to get depts reason - ', reason);
      Logger.error('addNewEvent: ' + reason);
      return this.getDbError(reason);
    });
    if (deptsData.length !== data.depts.length) {
      Logger.error('addNewEvent: ' +  Status.SERVER_ERRORS.depts.id_not_found);
      this.sendError(res,this.getModifiedError(deptsData, Status.ERROR_CODES.events.add_db_error_msg))
      return;    
    }
    let eventData: any = await this.eventRepo.addNewEvent(data).catch((reason) => {
      console.error('addNewEvent: failed to add event reason - ', reason);
      Logger.error('addNewEvent: ' + reason);
      return this.getDbError(reason);
    });
    if (eventData.error) {
      this.sendError(res, this.getModifiedError(eventData, Status.ERROR_CODES.events.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(eventData, '_id');
    Logger.info('addNewEvent: ' + Status.SERVER_SUCCESS.events.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  getAllEvents = async (req: Request, res: Response) => {
    let reqQuery: any = req.query;
    let queryError = this.checkQueryValidate(reqQuery);

    if (queryError) {
      Logger.error('getAllEvents: queryValidate: ' + queryError);
      let error = this.getQueryError(queryError);
      this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.loc.get_db_error_msg));
      return;
    }
    let eventData: any = await this.eventRepo.getAllEvents(reqQuery).catch((reason) => {
      console.error('getAllEvents: Failed to get events reason - ', reason);
      Logger.error('getAllEvents: ' + reason);
      return this.getDbError(reason);
    });
    if (eventData.error) {
      this.sendError(res, this.getModifiedError(eventData, Status.ERROR_CODES.events.get_db_error_msg));
      return;
    }
    if (eventData.length == Constants.zeroLength) {
      Logger.error('getAllEvents: ' + Status.SERVER_ERRORS.events.record_not_found);
      this.sendError(res, Status.ERROR_CODES.events.record_not_found_msg);
      return;
    }
    Logger.info('getAllEvents: ' + Status.SERVER_SUCCESS.events.data_fetched);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, eventData);
  };
  // addNewAdmin = async (req: Request, res: Response) => {
  //   let data: I = req.body;
  //   let deptId = data.deptId;
  //   let deptData: any = await this.deptRepo.getDeptById(deptId).catch((reason) => {
  //     console.error('addNewUser: failed to get dept reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (!deptData) {
  //     Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
  //     return;
  //   }
  //   if (deptData.error) {
  //     this.sendError(
  //       res,
  //       this.getModifiedError(deptData, Status.ERROR_CODES.users.add_db_error_msg)
  //     );
  //     return;
  //   }
  //   let userExistData: any = await this.userRepo.getUserByName(data.fullName).catch((reason) => {
  //     console.error('addNewUser: failed to get user reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (userExistData) {
  //     Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.user_already_exist);
  //     this.sendError(res, Status.ERROR_CODES.users.user_already_exist);
  //     return;
  //   }
  //   let salt: string = await bcrypt.genSalt(10);
  //   const hashedPassword: string = await bcrypt.hash(data.password, salt);
  //   data.password = hashedPassword;
  //   let userData: any = await this.userRepo.addNewUser(data).catch((reason) => {
  //     console.error('addNewUser: failed to add user reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (userData.error) {
  //     this.sendError(
  //       res,
  //       this.getModifiedError(userData, Status.ERROR_CODES.users.add_db_error_msg)
  //     );
  //     return;
  //   }
  //   let resultJson = this.removeKeyfromObject(userData, '_id');
  //   Logger.info('addNewUser: ' + Status.SERVER_SUCCESS.user.data_added);
  //   this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  // };

  // addNewUser = async (req: Request, res: Response) => {
  //   let data: IUser = req.body;
  //   let deptId = data.deptId;
  //   let deptData: any = await this.deptRepo.getDeptById(deptId).catch((reason) => {
  //     console.error('addNewUser: failed to get dept reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (!deptData) {
  //     Logger.error('addNewUser: ' + Status.SERVER_ERRORS.depts.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
  //     return;
  //   }
  //   if (deptData.error) {
  //     this.sendError(
  //       res,
  //       this.getModifiedError(deptData, Status.ERROR_CODES.users.add_db_error_msg)
  //     );
  //     return;
  //   }
  //   let userExistData: any = await this.userRepo.getUserByName(data.fullName).catch((reason) => {
  //     console.error('addNewUser: failed to get user reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (userExistData) {
  //     Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.user_already_exist);
  //     this.sendError(res, Status.ERROR_CODES.users.user_already_exist);
  //     return;
  //   }
  //   let userData: any = await this.userRepo.addNewUser(data).catch((reason) => {
  //     console.error('addNewUser: failed to add user reason - ', reason);
  //     Logger.error('addNewUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (userData.error) {
  //     this.sendError(
  //       res,
  //       this.getModifiedError(userData, Status.ERROR_CODES.users.add_db_error_msg)
  //     );
  //     return;
  //   }
  //   let resultJson = this.removeKeyfromObject(userData, '_id');
  //   Logger.info('addNewUser: ' + Status.SERVER_SUCCESS.user.data_added);
  //   this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  // };

  // loginUser = async (req: Request, res: Response) => {
  //   let data: IUser = req.body;
  //   let userData: any = await this.userRepo.getUserByEmail(data.email).catch((reason) => {
  //     console.error('loginUser: failed to get user reason - ', reason);
  //     Logger.error('loginUser: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (!userData) {
  //     Logger.error('loginUser: ' + Status.SERVER_ERRORS.users.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.users.record_not_found_msg);
  //     return;
  //   }
  //   let result: boolean = await bcrypt.compare(data.password, userData.password);
  //   if (!result) {
  //     Logger.error('loginUser: ' + Status.SERVER_ERRORS.users.user_password_not_same);
  //     this.sendError(res, Status.ERROR_CODES.users.user_password_not_same);
  //     return;
  //   }
  //   this.setLastLoginTime(userData, 'web');
  //   const payload = {
  //     userId: userData.id,
  //     email: userData.email,
  //   };
  //   const token: string = jwt.sign(payload, config.jwtSecret, { expiresIn: '35d' }); // , (err, token) => {
  //   let resultJson = {
  //     token,
  //     user: {
  //       id: userData._id,
  //       name: userData.fullName,
  //       email: userData.email,
  //     },
  //   };
  //   Logger.info('loginUser: ' + Status.SERVER_SUCCESS.user.logined);
  //   this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  // };
  
}

export default EventController;
