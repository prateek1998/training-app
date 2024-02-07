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

@Service()
class EventController extends BaseController {
  constructor(
    private eventRepo: EventRepo,
    private deptRepo: DeptRepo
  ) {
    super();
  }

  addNewEvent = async (req: Request, res: Response) => {
    let data: IEvents = req.body;
    console.log(data);
    res.json(data);
    return
    let deptId = 'asd' //data.deptId;
    let deptData: any = await this.eventRepo.addNewEvent(data).catch((reason) => {
      console.error('addNewUser: failed to get dept reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (!deptData) {
      Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
      return;
    }
    if (deptData.error) {
      this.sendError(
        res,
        this.getModifiedError(deptData, Status.ERROR_CODES.users.add_db_error_msg)
      );
      return;
    }
    // let userExistData: any = await this.userRepo.getUserByName(data.fullName).catch((reason) => {
    //   console.error('addNewUser: failed to get user reason - ', reason);
    //   Logger.error('addNewUser: ' + reason);
    //   return this.getDbError(reason);
    // });
    // if (userExistData) {
    //   Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.user_already_exist);
    //   this.sendError(res, Status.ERROR_CODES.users.user_already_exist);
    //   return;
    // }
    // let salt: string = await bcrypt.genSalt(10);
    // const hashedPassword: string = await bcrypt.hash(data.password, salt);
    // data.password = hashedPassword;
    // let userData: any = await this.userRepo.addNewUser(data).catch((reason) => {
    //   console.error('addNewUser: failed to add user reason - ', reason);
    //   Logger.error('addNewUser: ' + reason);
    //   return this.getDbError(reason);
    // });
    // if (userData.error) {
    //   this.sendError(
    //     res,
    //     this.getModifiedError(userData, Status.ERROR_CODES.users.add_db_error_msg)
    //   );
    //   return;
    // }
    // let resultJson = this.removeKeyfromObject(userData, '_id');
    // Logger.info('addNewUser: ' + Status.SERVER_SUCCESS.user.data_added);
    // this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
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
