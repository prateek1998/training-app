import { Response, Request, NextFunction } from 'express';
import BaseController from './baseController';
import LocationRepo from '../repositories/locRepository';
import Logger from '../utils/winston.utils';
import Status from '../utils/status-codes-messages.utils';
import { Service } from 'typedi';
import { ILocation } from '../types';
import Constants from '../utils/constants.utils';

@Service()
class LocationController extends BaseController {
  constructor(private locRepo: LocationRepo) {
    super();
  }

  addNewLocation = async (req: Request, res: Response) => {
    let data: ILocation = req.body;
    let locData: any = await this.locRepo.addNewLocation(data).catch((reason) => {
      console.error('addNewLocation: failed to add loc reason - ', reason);
      Logger.error('addNewLocation: ' + reason);
      return this.getDbError(reason);
    });
    if (locData.error) {
      this.sendError(res, this.getModifiedError(locData, Status.ERROR_CODES.depts.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(locData, '_id');
    Logger.info('addNewLocation: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  getAllDepts = async (req: Request, res: Response) => {
    let reqQuery: any = req.query;
    let queryError = this.checkQueryValidate(reqQuery);

    if (queryError) {
      Logger.error('getAllDepts: queryValidate: ' + queryError);
      let error = this.getQueryError(queryError);
      this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.depts.get_db_error_msg));
      return;
    }
    let deptData: any = await this.locRepo.getAllLocations(reqQuery).catch((reason) => {
      console.error('getAllDepts: Failed to get dept reason - ', reason);
      Logger.error('getAllDepts: ' + reason);
      return this.getDbError(reason);
    });
    if (deptData.error) {
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.get_db_error_msg));
      return;
    }
    if (deptData.length == Constants.zeroLength) {
      Logger.error('getAllDepts: ' + Status.SERVER_ERRORS.depts.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
      return;
    }
    Logger.info('getAllDepts: ' + Status.SERVER_SUCCESS.dept.data_fetched);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, deptData);
  };

  updateDept = async (req: Request, res: Response) => {
    const { deptId }: any = req.params;
    let data: any = req.body;
    let deptData: any = await this.locRepo.updateLocation(deptId, data).catch((reason) => {
      console.error('updateDept: failed to update dept reason - ', reason);
      Logger.error('updateDept: ' + reason);
      return this.getDbError(reason);
    });
    if (!deptData) {
      Logger.error('updateDept: ' + Status.SERVER_ERRORS.depts.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.update_db_error_msg);
      return;
    }
    if (deptData.error) {
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.update_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(deptData, '_id');
    Logger.info('deleteDept: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };

  deleteDept = async (req: Request, res: Response) => {
    const { deptId }: any = req.params;
    let deptData: any = await this.locRepo.deleteLocation(deptId).catch((reason) => {
      console.error('deleteDept: failed to delete dept reason - ', reason);
      Logger.error('deleteDept: ' + reason);
      return this.getDbError(reason);
    });
    if (!deptData) {
      Logger.error('deleteDept: ' + Status.SERVER_ERRORS.depts.record_not_found);
      this.sendError(res, Status.ERROR_CODES.depts.delete_db_error_msg);
      return;
    }
    if (deptData.error) {
      this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.delete_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(deptData, '_id');
    Logger.info('deleteDept: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };
}

export default LocationController;
