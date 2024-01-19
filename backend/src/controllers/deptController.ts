import { Response, Request, NextFunction } from 'express';
import BaseController from "./baseController";
import DeptRepo from '../repositories/deptRepository';
import Logger from "../utils/winston.utils";
import Status from "../utils/status-codes-messages.utils";
import { Service } from 'typedi';
import { IDeptartment } from '../types';
import Constants from '../utils/constants.utils';

@Service()
class DeptController extends BaseController {
    constructor(private deptRepo: DeptRepo) {
        super();
    }

    addNewDept = async (req: Request, res: Response) => {
        let data: IDeptartment = req.body;
        let deptData: any = await this.deptRepo.addNewDept(data).catch((reason) => {
            console.error('addNewDept: failed to add dept reason - ', reason);
            Logger.error("addNewDept: " + reason);
            return this.getDbError(reason);
        });
        if (deptData.error) {
            this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.add_db_error_msg));
            return;
        }
        let resultJson = this.removeKeyfromObject(deptData, '_id');
        Logger.info('addNewReview: ' + Status.SERVER_SUCCESS.dept.data_added);
        this.sendSuccess(res, Status.HTTP_CODES.CREATED, resultJson);
    }

    getAllDepts = async (req: Request, res: Response) => {
        let reqQuery: any = req.query;
        let queryError = this.checkQueryValidate(reqQuery);

        if (queryError) {
            Logger.error("getAllDepts: queryValidate: " + queryError);
            let error = this.getQueryError(queryError);
            this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.depts.get_db_error_msg));
            return;
        }

        let deptData: any = await this.deptRepo.getAllDepts(reqQuery).catch((reason) => {
            console.error('getAllDepts: Failed to get dept reason - ', reason);
            Logger.error("getAllDepts: " + reason);
            return this.getDbError(reason);
        });

        if (deptData.error) {
            this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.depts.get_db_error_msg));
            return;
        }
        if (deptData.length == Constants.zeroLength) {
            Logger.error("getAllDepts: " + Status.SERVER_ERRORS.depts.record_not_found);
            this.sendError(res, Status.ERROR_CODES.depts.record_not_found_msg);
            return;
          }
          Logger.info("getAllDepts: " + Status.SERVER_SUCCESS.dept.data_fetched);
          this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, deptData);
    }
}

export default DeptController;