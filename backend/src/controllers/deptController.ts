import { Response, Request, NextFunction } from 'express';
import BaseController from "./baseController";
import DeptRepo from '../repositories/deptRepository';
import Logger from "../utils/winston.utils";
import Status from "../utils/status-codes-messages.utils";
import { Service } from 'typedi';
import { IDeptartment } from '../types';

@Service()
class DeptController extends BaseController {
    constructor(private deptRepo: DeptRepo) {
        super();
    }
    
    addNewDept = async (req: Request, res: Response) => {
        let data: IDeptartment = req.body;
        console.log(data)
        return
        // let deptData: any = await this.deptRepo.getDeptByName(data.deptName).catch((reason) => {
        //     console.error('addNewDept: Failed to get dept reason - ', reason);
        //     Logger.error("addNewDept: " + reason);
        //     return this.getDbError(reason);
        //   });
        
        // if(deptData){
        //     Logger.info("addNewDept: " + Status.SERVER_ERRORS.application.app_already_exist);
        //     this.sendError(res, Status.ERROR_CODES.application.app_already_exist_msg);
        //     return;   
        // }
        // console.log(deptData)
        // return
        let deptData: any = await this.deptRepo.addNewDept(data).catch((reason) => {
            console.error('addNewDept: failed to add dept reason - ', reason);
            Logger.error("addNewDept: " + reason);
            return this.getDbError(reason);
        });

        if (deptData.error) {
            // Logger.info("addNewDept: " + Status.SERVER_ERRORS.application.app_already_exist);
            // this.sendError(res, Status.ERROR_CODES.application.app_already_exist_msg);
            //     return;  
            this.sendError(res, this.getModifiedError(deptData, Status.ERROR_CODES.reviews.add_db_error_msg));
            return;
          }

          
        // console.log(result)
        res.send("hi")

        // console.log(this.userRepo.addNewUser(data))
    }
    getAllDepts = async (req: Request, res: Response) => {
        let data = req.body;
        console.log("dept2", data);

        // console.log(this.userRepo.addNewUser(data))
    }
}

export default DeptController;