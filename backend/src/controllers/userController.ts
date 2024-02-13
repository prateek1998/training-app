import { Response, Request, NextFunction } from 'express';
import BaseController from './baseController';
import UserRepo from '../repositories/userRepository';
import DeptRepo from '../repositories/deptRepository';
import Logger from '../utils/winston.utils';
import Status from '../utils/status-codes-messages.utils';
import { Service } from 'typedi';
import { IUser } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Constants from '../utils/constants.utils';
import moment from 'moment';
import config from '../config/config-index';

@Service()
class UserController extends BaseController {
  constructor(
    private userRepo: UserRepo,
    private deptRepo: DeptRepo
  ) {
    super();
  }

  addNewAdmin = async (req: Request, res: Response) => {
    let data: IUser = req.body;
    let deptId = data.deptId;
    let deptData: any = await this.deptRepo.getDeptById(deptId).catch((reason) => {
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
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.users.add_db_error_msg));
      return;
    }
    let userExistData: any = await this.userRepo.getUserByName(data.fullName).catch((reason) => {
      console.error('addNewUser: failed to get user reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (userExistData) {
      Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.user_already_exist);
      this.sendError(res, Status.ERROR_CODES.users.user_already_exist);
      return;
    }
    let salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    let userData: any = await this.userRepo.addNewUser(data).catch((reason) => {
      console.error('addNewUser: failed to add user reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (userData.error) {
      this.sendError(res, this.getModifiedError(userData, Status.ERROR_CODES.users.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(userData, '_id');
    Logger.info('addNewUser: ' + Status.SERVER_SUCCESS.user.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  addNewUser = async (req: Request, res: Response) => {
    let data: IUser = req.body;
    let deptId = data.deptId;
    let deptData: any = await this.deptRepo.getDeptById(deptId).catch((reason) => {
      console.error('addNewUser: failed to get dept reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (!deptData) {
      Logger.error('addNewUser: ' + Status.SERVER_ERRORS.depts.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
      return;
    }
    if (deptData.error) {
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.users.add_db_error_msg));
      return;
    }
    let userExistData: any = await this.userRepo.getUserByName(data.fullName).catch((reason) => {
      console.error('addNewUser: failed to get user reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (userExistData) {
      Logger.error('addNewUser: ' + Status.SERVER_ERRORS.users.user_already_exist);
      this.sendError(res, Status.ERROR_CODES.users.user_already_exist);
      return;
    }
    let userData: any = await this.userRepo.addNewUser(data).catch((reason) => {
      console.error('addNewUser: failed to add user reason - ', reason);
      Logger.error('addNewUser: ' + reason);
      return this.getDbError(reason);
    });
    if (userData.error) {
      this.sendError(res, this.getModifiedError(userData, Status.ERROR_CODES.users.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(userData, '_id');
    Logger.info('addNewUser: ' + Status.SERVER_SUCCESS.user.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  loginUser = async (req: Request, res: Response) => {
    let data: IUser = req.body;
    let userData: any = await this.userRepo.getUserByEmail(data.email).catch((reason) => {
      console.error('loginUser: failed to get user reason - ', reason);
      Logger.error('loginUser: ' + reason);
      return this.getDbError(reason);
    });
    if (!userData) {
      Logger.error('loginUser: ' + Status.SERVER_ERRORS.users.record_not_found);
      this.sendError(res, Status.ERROR_CODES.users.record_not_found_msg);
      return;
    }
    let result: boolean = await bcrypt.compare(data.password, userData.password);
    if (!result) {
      Logger.error('loginUser: ' + Status.SERVER_ERRORS.users.user_password_not_same);
      this.sendError(res, Status.ERROR_CODES.users.user_password_not_same);
      return;
    }
    this.setLastLoginTime(userData, 'web');
    const payload = {
      userId: userData.id,
      email: userData.email,
    };
    const token: string = jwt.sign(payload, config.jwtSecret, { expiresIn: '35d' }); // , (err, token) => {
    let resultJson = {
      token,
      user: {
        id: userData._id,
        name: userData.fullName,
        email: userData.email,
      },
    };
    Logger.info('loginUser: ' + Status.SERVER_SUCCESS.user.logined);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };

  getAllUsers = async (req: Request, res: Response) => {
    let reqQuery: any = req.query;
    let queryError = this.checkQueryValidate(reqQuery);
    if (queryError) {
      Logger.error('getAllUsers: queryValidate: ' + queryError);
      let error = this.getQueryError(queryError);
      this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.depts.get_db_error_msg));
      return;
    }
    let userData: any = await this.userRepo.getAllUsers(reqQuery).catch((reason) => {
      console.error('getAllUsers: Failed to get dept reason - ', reason);
      Logger.error('getAllUsers: ' + reason);
      return this.getDbError(reason);
    });
    if (userData.error) {
      this.sendError(res, this.getModifiedError(userData, Status.ERROR_CODES.depts.get_db_error_msg));
      return;
    }
    if (userData.length == Constants.zeroLength) {
      Logger.error('getAllUsers: ' + Status.SERVER_ERRORS.depts.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
      return;
    }
    Logger.info('getAllUsers: ' + Status.SERVER_SUCCESS.dept.data_fetched);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, userData);
  };

  updateUser = async (req: Request, res: Response) => {
    const { userId }: any = req.params;
    let data: any = req.body;
    let userData: any = await this.userRepo.updateUser(userId, data).catch((reason) => {
      console.error('updateUser: failed to update dept reason - ', reason);
      Logger.error('updateUser: ' + reason);
      return this.getDbError(reason);
    });
    if (!userData) {
      Logger.error('updateUser: ' + Status.SERVER_ERRORS.users.record_not_found);
      this.sendError(res, Status.ERROR_CODES.users.update_db_error_msg);
      return;
    }
    if (userData.error) {
      this.sendError(res, this.getModifiedError(userData, Status.ERROR_CODES.users.update_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(userData, '_id');
    Logger.info('updateUser: ' + Status.SERVER_SUCCESS.dept.data_updated);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };

  deleteUser = async (req: Request, res: Response) => {
    const { userId }: any = req.params;
    let userData: any = await this.userRepo.deleteUser(userId).catch((reason) => {
      console.error('deleteUser: failed to delete user reason - ', reason);
      Logger.error('deleteUser: ' + reason);
      return this.getDbError(reason);
    });
    if (!userData) {
      Logger.error('deleteUser: ' + Status.SERVER_ERRORS.users.record_not_found);
      this.sendError(res, Status.ERROR_CODES.users.delete_db_error_msg);
      return;
    }
    if (userData.error) {
      this.sendError(res, this.getModifiedError(userData, Status.ERROR_CODES.users.delete_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(userData, '_id');
    Logger.info('deleteDept: ' + Status.SERVER_SUCCESS.dept.data_deleted);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };

  private setLastLoginTime = async (user: IUser, platform: string) => {
    console.log('last login time called --', user.email, platform);
    if (platform == 'web') {
      user.lastLoginTime = new Date(moment().format('YYYY-MM-DD HH:mm:ss') + 'Z');
    }
    let updatedUser: any = await this.userRepo.updateUser(user.id, user).catch((reason) => {
      console.error('loginUser: failed to get dept reason - ', reason);
      Logger.error('loginUser: ' + reason);
      return this.getDbError(reason);
    });
    // console.log("user last login time saved successsfully ", updatedUser.lastLoginTime);
  };
}

export default UserController;
