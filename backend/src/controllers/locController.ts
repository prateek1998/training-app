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
      this.sendError(res, this.getModifiedError(locData, Status.ERROR_CODES.loc.add_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(locData, '_id');
    Logger.info('addNewLocation: ' + Status.SERVER_SUCCESS.loc.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
  };

  getAllLocations = async (req: Request, res: Response) => {
    let reqQuery: any = req.query;
    let queryError = this.checkQueryValidate(reqQuery);

    if (queryError) {
      Logger.error('getAllLocations: queryValidate: ' + queryError);
      let error = this.getQueryError(queryError);
      this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.loc.get_db_error_msg));
      return;
    }
    let locData: any = await this.locRepo.getAllLocations(reqQuery).catch((reason) => {
      console.error('getAllLocations: Failed to get location reason - ', reason);
      Logger.error('getAllLocations: ' + reason);
      return this.getDbError(reason);
    });
    if (locData.error) {
      this.sendError(res, this.getModifiedError(locData, Status.ERROR_CODES.loc.get_db_error_msg));
      return;
    }
    if (locData.length == Constants.zeroLength) {
      Logger.error('getAllLocations: ' + Status.SERVER_ERRORS.loc.record_not_found);
      this.sendError(res, Status.ERROR_CODES.loc.record_not_found_msg);
      return;
    }
    Logger.info('getAllLocations: ' + Status.SERVER_SUCCESS.loc.data_fetched);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, locData);
  };

  updateLocation = async (req: Request, res: Response) => {
    const { locId }: any = req.params;
    let data: any = req.body;
    let locData: any = await this.locRepo.updateLocation(locId, data).catch((reason) => {
      console.error('updateDept: failed to update location reason - ', reason);
      Logger.error('updateDept: ' + reason);
      return this.getDbError(reason);
    });
    if (!locData) {
      Logger.error('updateDept: ' + Status.SERVER_ERRORS.loc.record_not_found);
      this.sendError(res, Status.ERROR_CODES.loc.update_db_error_msg);
      return;
    }
    if (locData.error) {
      this.sendError(res, this.getModifiedError(locData, Status.ERROR_CODES.loc.update_db_error_msg));
      return;
    }
    let resultJson = this.removeKeyfromObject(locData, '_id');
    Logger.info('updateLocation: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };

  deleteLocation = async (req: Request, res: Response) => {
    const { locId }: any = req.params;
    let locData: any = await this.locRepo.deleteLocation(locId).catch((reason) => {
      console.error('deleteDept: failed to delete location reason - ', reason);
      Logger.error('deleteDept: ' + reason);
      return this.getDbError(reason);
    });
    console.log(locData)
    if (!locData) {
      Logger.error('deleteDept: ' + Status.SERVER_ERRORS.loc.record_not_found);
      this.sendError(res, Status.ERROR_CODES.loc.delete_db_error_msg);
      return;
    }
    console.log("77" + locData)
    if (locData.error) {
      this.sendError(res, this.getModifiedError(locData, Status.ERROR_CODES.loc.delete_db_error_msg));
      return;
    }
    console.log("7" + locData)
    
    let resultJson = this.removeKeyfromObject(locData, '_id');
    Logger.info('deleteDept: ' + Status.SERVER_SUCCESS.dept.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, resultJson);
  };
}

export default LocationController;
