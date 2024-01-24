import { Response, Request, NextFunction } from 'express';
import BaseController from './baseController';
import UserRepo from '../repositories/userRepository';
import Logger from '../utils/winston.utils';
import Status from '../utils/status-codes-messages.utils';
import { Service } from 'typedi';
import { IUser } from '../types';
import Constants from '../utils/constants.utils';

@Service()
class UserController extends BaseController {
  constructor(private userRepo: UserRepo) {
    super();
  }

  addNewUser = async (req: Request, res: Response) => {
    let data: IUser = req.body;
    let deptData: any = await this.userRepo.addNewUser(data).catch((reason) => {
      console.error('addNewDept: failed to add dept reason - ', reason);
      Logger.error('addNewDept: ' + reason);
      return this.getDbError(reason);
    });
    if (deptData.error) {
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(deptData, '_id');
    Logger.info('addNewDept: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  // getAllDepts = async (req: Request, res: Response) => {
  //   let reqQuery: any = req.query;
  //   let queryError = this.checkQueryValidate(reqQuery);

  //   if (queryError) {
  //     Logger.error('getAllDepts: queryValidate: ' + queryError);
  //     let error = this.getQueryError(queryError);
  //     this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.depts.get_db_error_msg));
  //     return;
  //   }
  //   let deptData: any = await this.userRepo.getAllDepts(reqQuery).catch((reason) => {
  //     console.error('getAllDepts: Failed to get dept reason - ', reason);
  //     Logger.error('getAllDepts: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (deptData.error) {
  //     this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.get_db_error_msg));
  //     return;
  //   }
  //   if (deptData.length == Constants.zeroLength) {
  //     Logger.error('getAllDepts: ' + Status.SERVER_ERRORS.depts.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
  //     return;
  //   }
  //   Logger.info('getAllDepts: ' + Status.SERVER_SUCCESS.dept.data_fetched);
  //   this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, deptData);
  // };

  // updateDept = async (req: Request, res: Response) => {
  //   const { deptId }: any = req.params;
  //   let data: any = req.body;
  //   let deptData: any = await this.userRepo.updateDept(deptId, data).catch((reason) => {
  //     console.error('updateDept: failed to update dept reason - ', reason);
  //     Logger.error('updateDept: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (!deptData) {
  //     Logger.error('updateDept: ' + Status.SERVER_ERRORS.depts.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.update_db_error_msg);
  //     return;
  //   }
  //   if (deptData.error) {
  //     this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.update_db_error_msg));
  //     return;
  //   }
  //   let resultJson = this.removeKeyfromObject(deptData, '_id');
  //   Logger.info('updateDept: ' + Status.SERVER_SUCCESS.dept.data_updated);
  //   this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  // };

  // deleteDept = async (req: Request, res: Response) => {
  //   const { deptId }: any = req.params;
  //   let deptData: any = await this.userRepo.deleteDept(deptId).catch((reason) => {
  //     console.error('deleteDept: failed to delete dept reason - ', reason);
  //     Logger.error('deleteDept: ' + reason);
  //     return this.getDbError(reason);
  //   });
  //   if (!deptData) {
  //     Logger.error('deleteDept: ' + Status.SERVER_ERRORS.depts.record_not_found);
  //     this.sendError(res, Status.ERROR_CODES.depts.delete_db_error_msg);
  //     return;
  //   }
  //   if (deptData.error) {
  //     this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.delete_db_error_msg));
  //     return;
  //   }
  //   let resultJson = this.removeKeyfromObject(deptData, '_id');
  //   Logger.info('deleteDept: ' + Status.SERVER_SUCCESS.dept.data_deleted);
  //   this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  // };
}

export default UserController;
